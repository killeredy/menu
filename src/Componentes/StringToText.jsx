

export default function StringToText({text}) {
    if(!text){
      return "";
    }

    const newText = text.split('\n').map(str => <p>{str}</p>);
    return newText;
  }