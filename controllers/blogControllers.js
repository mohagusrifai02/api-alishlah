import db from "../db.js";
import slugify from "slugify";

export const tambahBlog = async(req,res)=>{
    const {judul, kategori, paragraf} = req.body;
    const gambar = req.file?.filename;

    if(!judul || !kategori || !paragraf || !gambar){
        return res.status(400).json({error:'field wajib diisi'});
    }

    try {
        const [id] = await db('blogs').insert({judul, kategori, paragraf, gambar});
        const slug = slugify(judul, {lower:true, strict:true}) + '-' + id;
        await db('blogs').where('id',id).update({ slug });

        res.status(201).json({message:'blog ditambahkan'})
    } catch (error) {
        res.status(500).json({error:message});
    }
}


export const getBlogs = async(req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const offset = (page - 1) * limit;

    try {
        const total = await db('blogs').count('id as count').first();
        const blogs = await db('blogs')
        .select('id','judul','slug','kategori','paragraf','gambar')
        .orderBy('id','desc')
        .limit(limit)
        .offset(offset);
        res.json({
            currenPage : page,
            totalData : total.count,
            totalPages : Math.ceil(total.count / limit),
            data : blogs
        });
    } catch (error) {
        res.status(500).json({ error:error.message });
    }
}

export const detailBlog = async(req,res)=>{
    try {
        const blog = await db('blogs').where('slug', req.params.slug).first();
        if(!blog) {
            return res.status(404).json({error:'data tidak ditemukan'});
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const hapusBlogs = async(req,res)=>{
    try{
        const deleted = await db('blogs').where('id', req.params.id).del();
        if(!deleted){
            return res.status(404).json({error:'blog tidak ditemukan'});
        }
        res.json({message:'blog berhasil dihapus'});
    } catch(error){
        res.status(500).json({error:error.message});
    }
}

export const updateBlog = async(req,res)=>{
    const {judul, kategori, paragraf} = req.body;
    const gambarBaru = req.file?.filename;

    try {
        const blog = await db('blogs').where('id', req.params.id).first();
        if(!blog) return res.status(404).json({error:'blog tidak ditemukan'});
        
        const dataUpdate ={
            judul : judul || blog.judul,
            kategori: kategori || blog.kategori,
            paragraf : paragraf || blog.paragraf,
            gambar : gambarBaru || blog.gambar
        }

        await db('blogs').where('id', req.params.id).update(dataUpdate);
        res.json({message:'berhasil di update'});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}