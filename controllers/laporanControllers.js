import db from "../db.js";
import slugify from "slugify";

export const tambahLaporan = async(req, res)=>{
    const {
        judul,
        infak, 
        kencleng, 
        kotakinfak, 
        zakat,
        penerimaan,
        pendidikan,
        sosial,
        dakwah,
        operasional
    } = req.body;
    
    try {
        const [id] = await db('laporan').insert({
            judul,infak,kencleng,kotakinfak,zakat,penerimaan,pendidikan,sosial,dakwah,operasional
        });
        const slug = slugify(judul, {lower:true, strict:true}) + '-' + id;
        await db('laporan').where('id', id).update({slug});

        res.status(201).json({message:'laporan ditambahkan'});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

export const getLaporan = async(req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const offset = (page - 1) * limit;

    try {
        const total = await db('laporan').count('id as count').first();
        const laporan = await db('laporan').select(
            'id','judul','slug','infak','kencleng', 'kotakinfak','zakat','penerimaan','pendidikan','sosial','dakwah','operasional'
        )
        .orderBy('id','desc')
        .limit(limit)
        .offset(offset);
        res.json({
            currenPage : page,
            totalData : total.count,
            totalPages : Math.ceil(total.count / limit),
            data : laporan
        });

    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

export const detailLaporan = async(req,res)=>{
    try {
        const laporan = await db('laporan').where('slug', req.params.slug).first();
        if(!laporan) return res.status(404).json({message:'data tidak ditemukan'});
        res.json(laporan);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

export const hapusLaporan = async(req,res)=>{
    try {
        const deleted = await db('laporan').where('id', req.params.id).del();
        if(!deleted){
            return res.status(404).json({error:'data tidak ditemukan'});
        }
        res.json({message:'data berhasil dihapus'});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

export const updateLaporan = async(req,res)=>{
    const {
        judul,
        infak, 
        kencleng, 
        kotakinfak, 
        zakat,
        penerimaan,
        pendidikan,
        sosial,
        dakwah,
        operasional
    } = req.body;

    try {
        const laporan = await db('laporan').where('id', req.params.id).first();
        if(!laporan) return res.status(404).json({message:'data tidak ditemukan'});

        const laporanUpdate = {
            judul : judul || laporan.judul,
            infak : infak || laporan.infak,
            kencleng : kencleng || laporan.kencleng,
            kotakinfak : kotakinfak || laporan.kotakinfak,
            zakat : zakat || laporan.zakat,
            penerimaan : penerimaan || laporan.penerimaan,
            pendidikan : pendidikan || laporan.pendidikan,
            sosial : sosial || laporan.sosial,
            dakwah : dakwah || laporan.dakwah,
            operasional : operasional || laporan.operasional
        }

        await db('laporan').where('id', req.params.id).update(laporanUpdate);

        res.json({message:'data berhasil di update'});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}