import db from "../db.js";
import slugify from "slugify";

const generateSlugLaporan = async()=>{
    try {
        const laporan = await db('laporan').select('id','judul');
        for(const lapor of laporan){
            const slug = slugify(lapor.judul, { lower:true, strict:true}) + '-' + lapor.id;
            await db('laporan').where('id',lapor.id).update({ slug });
            console.log(`Update laporan ID ${lapor.id} with slug: ${slug}`)
        }

        console.log("Slug generating completed");
        process.exit(0);
    } catch (error) {
        console.error('Error generating slugs:',error);
        process.exitCode(1);
    }
};

generateSlugLaporan();

