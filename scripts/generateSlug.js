import db from "../db.js";
import slugify from "slugify";

const generateSlugs = async()=>{
    try {
        const blogs = await db('blogs').select('id','judul');
        for(const blog of blogs){
            const slug = slugify(blog.judul, { lower:true, strict:true}) + '-' + blog.id;
            await db('blogs').where('id',blog.id).update({ slug });
            console.log(`Update blog ID ${blog.id} with slug: ${slug}`)
        }

        console.log("Slug generating completed");
        process.exit(0);
    } catch (error) {
        console.error('Error generating slugs:',error);
        process.exitCode(1);
    }
};

generateSlugs();

