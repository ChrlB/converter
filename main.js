const binary = 2,octa = 8,decimal = 10, hexa = 16;
const inputNo1 = input1.value.trim();
let solutionTxt = ""

btn.addEventListener("click",()=>{
    
    let answer, selected1Val ;
    selected1Val = checkSelected(select1.value);
    if(select1.value == select2.value) answer = inputNo1;
    else if(select1.value == "decimal") answer = decimalToAny(input1.value,checkSelected(select2.value));
    else if(select1.value == "binary") answer = binaryToAny(input1.value,checkSelected(select2.value));
    else{
        if(select2.value == "decimal") answer = anyToDecimal(input1.value,selected1Val);
        else answer = decimalToAny(anyToDecimal(input1.value,selected1Val),checkSelected(select2.value),solutionTxt);//answer = anyToDecimal(input1.value,checkSelected(select2.value));
    }
    input2.value = (answer);
    console.log(answer)
})
showSolution.addEventListener("change",()=>{
    solution.type =  (solution.type == "hidden")? "text":"hidden";
    solution.classList.toggle("hide")
})
function checkSelected(selected){
    switch(selected){
        case "decimal":return decimal;break;
        case "binary":return binary;break;
        case "octa":return octa;break;
        case "hexa":return hexa;break;
    };
}
function decimalToAny(converting,convertTo,solutionTxt = ""){
    let remainder, answer = ""; 
    while(converting > 0){
        remainder = converting % convertTo;
        solutionTxt += `${converting} / ${convertTo} = ${Math.floor(converting / convertTo)} r ${remainder} \n`
        answer = (remainder > 9)? String.fromCharCode((remainder - 9) + 64)+answer :remainder + answer;
        converting = Math.floor(converting / convertTo);
    }
    solutionTxt += `${select2.value} value: ${answer}\n`;
    solution.value = solutionTxt;
    return answer;
}
function anyToDecimal(converting,selected1Val){
    const len = converting.length;
    let answer = 0, zero = '0';solutionTxt = "" ;
    let ctr = len-1, value,multiplyer;
    function solve(i){
        multiplyer = Math.pow(selected1Val,i);
        solutionTxt += `${value} * ${multiplyer} = ${value * multiplyer}\n`;
        answer += value * multiplyer;
    }
    for(i = 0;i<len;i++){
        if((converting.charCodeAt(ctr)-64+9) > 9 ){
            value = ((converting.charCodeAt(ctr--) - 64) + 9) ;
            solve(i);
            continue;
        }
        value = ((converting.charCodeAt(ctr--) - zero.charCodeAt(0)));
        solve(i);
    }
    solutionTxt += `Decimal value: ${answer}\n\n`;
    solution.value = solutionTxt;
    return answer;
}
function binaryToAny(converting,convertTo){
    let len = converting.trim().length;
    let answer = "", zeros = 4;;

    switch(convertTo){
        case 8:zeros = 3;break;
        case 10:zeros = 4;break;
        case 16:zeros = 4;break;
    }
    for(i = 0;i < (zeros -( len % 4));i++)
        converting = 0 + converting;
    len = converting.length;
    console.log(converting)
    console.log(Number(inputNo1) / zeros)
    let ptr = len-1;
    while(ptr > 0){
        let ctr = 1;
        let sum =0;
        for(i=0;i<zeros;i++){
            console.log(Number(converting.charAt(ptr)));
            sum += (Number(converting.charAt(ptr--)) == 1)? ctr:0;
            ctr *= 2;
        }
        console.log(sum);
        answer = (sum > 9)? String.fromCharCode((sum-9+64))+answer:sum + answer;
    }
    solution.value = `${convertTo} value: ${converting} = ${answer}\n\n`;
    return answer;
}