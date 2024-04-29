import LineTexture from "./LineTexture";



export default function MaskLine(offset){
    const maskTexture = LineTexture();
    maskTexture.name =  'mask-Anima'
    maskTexture.repeat.set(1, 0.25);
    maskTexture.offset.set(0,offset)
    return maskTexture;
}