import Bmy from "../models/Bmy.js";

// Create new BMY entry
export const createBmy = async (req, res) => {
    try {
        const { judul, penerimaan, pendidikan, sosial, dakwah, operasional } = req.body;
        
        const newBmy = new Bmy({ judul, penerimaan, pendidikan, sosial, dakwah, operasional });
        await newBmy.save();
        res.status(201).json(newBmy);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create BMY entry'});
    }
}

//get all bmy entries with pagination
export const getBmys = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const offset = (page - 1) * limit;

    try {
        const Bmys = await Bmy.find()
        .sort({createdAt:-1})
        .skip(offset)
        .limit(limit)
        const totalBmys = await Bmy.countDocuments();

        res.json({
            currentPage: page,
            totalBmys,
            totalPages: Math.ceil(totalBmys / limit),
            Bmys,
        })
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch BMY entries' });
    }
}

export const detailBmy = async(req,res)=>{
    try {
        const bmy = await Bmy.findOne({ slug: req.params.slug });
        if(!bmy) return res.status(404).json({ error:'data tidak ditemukan'});
        res.json(bmy);
    } catch (error) {
        res.status(500).json({ error:'Failed to fetch BMY entry by slug' });
    }
}

export const deleteBmy = async (req,res) => {
    try {
       const bmy = await Bmy.findByIdAndDelete(req.params.id);
       if(!bmy) return res.status(404).json({ error:'BMY entry not found' });
       res.json({ message:'BMY entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ error:'Failed to delete BMY entry' });
    }
}

export const updateBmy = async(req,res)=>{
    const { judul, penerimaan, pendidikan, sosial, dakwah, operasional } = req.body;
    try {
        const updateBmy = await Bmy.findByIdAndUpdate(
            req.params.id,
            { judul, penerimaan, pendidikan, sosial, dakwah, operasional },
            { new:true }
        )
        if(!updateBmy) return res.status(404).json({ error:'BMY entry not found' });
        res.json(updateBmy);
    } catch (error) {
        res.status(500).json({ error:'Failed to update BMY entry' });
    }
}