

const init = () => {
    const specialChars =  "\" !\#$%&\'()*+,-.\/:;<=>?@[\\]^_`{|}~";
    const numericChars = '1234567890';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseChars = lowerCaseChars.toUpperCase();

    const lengthMin = 8;
    const lengthMax = 128;
    let chosenLength;
    let password;

    var errors = [
            "Your 'Minimum Lenght's section is: Empty.",                    //0
            "You must choose a minimum length of: 8",                       //1
            "You must only enter an 'Integer Number' as the 'Minimum Length'.",  //2
            "Please enter a value between 8 and 128 in 'Minimum Length'.",  //3
            "You must choose at least <strong>one</strong> 'Character Type'.",               //4
        ]


    let errorList=[];

    const specialInput = document.getElementById('specialInput');
    const numberInput = document.getElementById('numberInput');
    const lowerInput = document.getElementById('lowerInput');
    const upperInput = document.getElementById('upperInput');
    const infoBox = document.getElementById('infoTxt');

    const generate = document.getElementById('generate');
    const clear = document.getElementById('clear');
    const copy = document.getElementById('copy');

    function ifNoCharTypeSleceted(){
        debugger
        if (specialInput.checked !==true ||
        numberInput.checked !==true ||
        lowerInput.checked !==true ||
        upperInput.checked !==true ){
            // return true;
        }else{
            return false;
        }
    }

    function printErrors(){
        let finalList = [];
        errorList = [...new Set(errorList)]
        errorList.forEach(function(err){
            if (typeof errors[err] !== typeof undefined){
                finalList.push(`<li>${errors[err]}</li>`)
            } else{
                console.log('??')
            }
        }
            )
        finalList = finalList.join('')
        infoBox.innerHTML = finalList;
    }


    function checkValidation(){
        // debugger
        errorList=[]
        chosenLength = document.getElementById('minLength').value;
        debugger
        switch(chosenLength){
            case (Number(0)):
                errorList.push(0,1,2);
            case chosenLength === NaN:
                errorList.push(2)
            case (chosenLength < 8):
                errorList.push(3)
            case (
                specialInput.checked !==true ||
                    numberInput.checked !==true ||
                    lowerInput.checked !==true ||
                    upperInput.checked !==true 
                ):
                console.log('this sucks')
                errorList.push(4)
            default:
            if (typeof errorList[0] === typeof undefined){
                return true
            }else{
                printErrors();
                return false;
            }
        } 
                // errorList.push(`\"<li>\"+${errors.a}+\"</li>\"+\"<li>\"+${errors.b}+\"</li>\"`);
                
                // console.log(errorList)
                


        // if (chosenLength === ''){
            // infoBox.innerHTML =  "<li>"+error.a+"</li>"+"<li>"+error.b+"</li>"  ;
        // }if ( typeof chosenLength !== typeof 1){   
            // infoBox.innerHTML =  "<li>"+error.c+"</li>"+"<li>"+error.d+"</li>"  ;
        // }

    }

    function generatePass () {
        if (checkValidation()){
            infoBox.innerHTML = ''
            // console.log('its a pass')
        }
    }
    generate.addEventListener('click',generatePass)
}

init();