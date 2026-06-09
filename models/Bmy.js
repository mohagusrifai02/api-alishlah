import mongoose from "mongoose";
import slugify from "slugify";

const bmySchema = new mongoose.Schema({
    judul : { type: String, required:true },
    slug: { type: String, unique:true },
    penerimaan : { type: Number, default:0 },
    pendidikan : { type: Number, default:0 },
    sosial : { type: Number, default:0 },
    dakwah : { type: Number, default:0 },
    operasional : { type: Number, default:0 },
    createdAt : { type: Date, default: Date.now }
})

bmySchema.pre('save', function (next){
    if(this.judul){
        this.slug = slugify(this.judul, {lower:true, strict:true});
        next();
    }
})

const Bmy = mongoose.model('Bmy', bmySchema);

export default Bmy;