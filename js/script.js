const init = () => {
    const specialChars =  "\"!\#$%&\'()*+,-.\/:;<=>?@[\\]^_`{|}~";
    const numericChars = '1234567890';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseChars = lowerCaseChars.toUpperCase();
    
    let chosenLength;
    let password=[];
    let errorList=[];
    let chars = [];

    // this is the set of erro outputs in reference form.
    var errors = [
            "> Your \"Minimum Lenght\" section is: Empty.",                                    //0
            "> You must choose a minimum of: 8, as length.",                                   //1
            "> You must only enter an 'Integer Number' as the 'Minimum Length'.",              //2
            "> Please enter a value between 8 and 128 in 'Minimum Length'.",                   //3
            "> You must choose at least <strong>one</strong> or more 'Character Type'.",       //4
        ];

    const specialInput = document.getElementById('specialInput');
    const numberInput = document.getElementById('numberInput');
    const lowerInput = document.getElementById('lowerInput');
    const upperInput = document.getElementById('upperInput');
    const infoBox = document.getElementById('infoTxt');
    const passwordField = document.getElementById('pass');
    const tooltip = document.querySelector('.tooltip');

    const copiedCard = document.getElementById('card');

    const generate = document.getElementById('generate');
    const copy = document.getElementById('copy');

    function ifNoCharTypeSleceted(){
        if (specialInput.checked !==true ||
        numberInput.checked !==true ||
        lowerInput.checked !==true ||
        upperInput.checked !==true ){
            return true;
        }else{
            return false;
        }
    }


    // generate the actual password randomly
    function generateIt(){
        password = [];
        chars = [];
        // check for selected char sets
        if (specialInput.checked ===true) {
            chars.push(specialChars);
        } if (numberInput.checked === true) {
            chars.push(numericChars)
        } if (lowerInput.checked ===true) {
            chars.push(lowerCaseChars)
        } if (  upperInput.checked ===true){
            chars.push(upperCaseChars)
        }
        
        function valid(){
            let trueFalseList = new Array(chars.length)
            chars.map(function(char,i){
                for (let len=0;len< password.length;len++){
                    let charSet = new Set(char)
                    if ( (charSet.has(password[len])) === true ){
                        trueFalseList[i] = true
                    }
                }
            })
            console.log(trueFalseList)
            const allMustBeTrue = new Set(trueFalseList)
            if (allMustBeTrue.has(undefined)) {
                return false;
            }else{
                return true;
            }
        }

        function generatous(){
            for (let i = 0; i < chosenLength; i++){
            // chars[random num between 0 and num of charSets selected][random number between 0 and max number of the chosen charset's length]
            let genNum = Math.floor(Math.random() * Math.floor(chars.length));
            password.push(chars[genNum][Math.floor(Math.random() * Math.floor(chars[genNum].length - 1))])
            }
                // validate to make sure there is at least 1 char, from each charSets
            if (valid()){
                passwordField.innerHTML = password.join('');
                passwordField.focus();
            } else{
                password = [];
                generatous()
            }
        }
        generatous()
    };


    // print the errors on the screen
    function printErrors(){
        let finalList = [];
        errorList = [...new Set(errorList)]
        console.log(errorList)

        if (errorList.includes(0) || errorList.includes(3) ){
            let tlm = new TimelineMax();
            tlm.fromTo(tooltip,0.2,{opacity:0},{opacity:1})
        }

        if ()

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

// check the validity of the input
    function checkValidation(){
        errorList=[]
        chosenLength = document.getElementById('minLength').value;
        if (chosenLength === ''){
            errorList.push(0,1);
        } if (chosenLength == 0 && Number(chosenLength) === 0){
            errorList.push(1);
        } if (Number(chosenLength) < 8 || Number(chosenLength) > 128 ){
            errorList.push(3);
        } if (isNaN(Number(chosenLength)) === true ){
            errorList.push(2);
            
        } if ((specialInput.checked ===true ||
              numberInput.checked === true ||
              lowerInput.checked ===true ||
              upperInput.checked ===true) === false){
            errorList.push(4);
        }
        if (typeof errorList[0] === typeof undefined){
            return true
        } else {
            // write the errors on the <textarea>
            printErrors();
            return false;
        }

    }


    function copyDo () {
        if (passwordField.value === ''){
            infoBox.innerHTML = 'Nothing To Copy to Clipboard..';
        } else {
            let tl = new TimelineMax();
            tl.fromTo(copiedCard, 0.2, {opacity:0},{opacity:1})
            .to(copiedCard, 0.9, {opacity:0},'+=0.3');
            


            infoBox.innerHTML = '';
            passwordField.focus();
            passwordField.select();
            document.execCommand('copy');
        }   
    }

    // 3.go through the process of generating a password
    function generatePass () {
        // 4. validate the input: if valid, then..
        if (checkValidation()){
            infoBox.innerHTML = '';
            passwordField.innerHTML = '';
            // 5. generate a new password
            generateIt();
        }
    }

    // 2. prepare the main event listeners

    function prompt(){
        // this function will prompt the user for input
    }

    function toolt(){
        let tlm = new TimelineMax();
        tlm.to(tooltip,0.2,{opacity:0})
            
    }
    
    
    document.getElementById('minLength').addEventListener('click',toolt)
    generate.addEventListener('click',generatePass)
    copy.addEventListener('click',copyDo)
    
}


// 1. init >:D
init();