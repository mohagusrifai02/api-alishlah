import midtransClient from 'midtrans-client';
import db from '../db.js';

// Inisialisasi Midtrans Snap
const snap = new midtransClient.Snap({
    isProduction: process.env.NODE_ENV === 'production', 
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
});

export const createTransaction = async (req, res) => {
    const { amount, customer_name, customer_email, item_details } = req.body;
    
    // Generate Order ID unik
    const order_id = `ORDER-${Date.now()}`;

    const parameter = {
        transaction_details: {
            order_id: order_id,
            gross_amount: parseInt(amount)
        },
        customer_details: {
            first_name: customer_name,
            email: customer_email
        },
        item_details: item_details,
        credit_card: {
            secure: true
        }
    };

    try {
        console.log("Sending to Midtrans:", JSON.stringify(parameter, null, 2));
        
        const transaction = await snap.createTransaction(parameter);
        
        // Opsional: Simpan data transaksi awal ke database SQLite Anda
        // await db('pembayaran').insert({
        //     order_id,
        //     amount,
        //     status: 'pending',
        //     customer_name
        // });

        res.status(200).json({
            token: transaction.token,
            redirect_url: transaction.redirect_url,
            order_id: order_id
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const handleNotification = async (req, res) => {
    try {
        const statusResponse = await snap.transaction.notification(req.body);
        const { order_id, transaction_status, fraud_status } = statusResponse;

        console.log(`Transaction notification received. Order ID: ${order_id}. Status: ${transaction_status}`);

        // Logika update status di database
        let statusUpdate = '';
        if (transaction_status == 'capture' || transaction_status == 'settlement') {
            statusUpdate = 'success';
        } else if (transaction_status == 'deny' || transaction_status == 'cancel' || transaction_status == 'expire') {
            statusUpdate = 'failure';
        } else if (transaction_status == 'pending') {
            statusUpdate = 'pending';
        }

        // Contoh update ke database:
        // await db('pembayaran').where('order_id', order_id).update({ status: statusUpdate });

        res.status(200).send('OK');
    } catch (error) {
        console.error('Midtrans Notification Error:', error);
        res.status(500).json({ error: error.message });
    }
};