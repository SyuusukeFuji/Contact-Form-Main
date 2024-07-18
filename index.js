const mailValidation= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const formulary= document.getElementById("contact-form");

const submitBt= document.getElementById("bt-submit");

const successCard= document.getElementById("success-card");

const fieldError=[document.getElementById("error-msg1"), 
                     document.getElementById("error-msg2"),
                     document.getElementById("error-msg3"),
                     document.getElementById("error-msg5"),
];

const radioError= document.getElementById("error-msg4");

const radioButtons= document.getElementsByName("query");
let isChecked= false;

const querySections= [document.getElementById("first-query"),
    document.getElementById("second-query")
];

const dataFields=[
    document.getElementById("fn-input"),
    document.getElementById("ln-input"),
    document.getElementById("email-field"),
    document.getElementById("message-area"),
];

const consentBt=document.getElementById("consent-bt");
const consentError= document.getElementById("error-msg6"); 

//radio section bground change.
radioButtons.forEach(rb => {
    rb.addEventListener("click", function(event){
        let rbIndex= 0;
    for(const rb of radioButtons){
        if(rb.checked){
            console.log("radio boton en check")
            querySections[rbIndex].classList.add("query-checked");

            if(rbIndex==0){querySections[rbIndex+1].classList.remove("query-checked");}
            if(rbIndex==1){querySections[rbIndex-1].classList.remove("query-checked");}

            
            break;
        }else if (!rb.checked){
            
            if(rbIndex==0){querySections[rbIndex+1].classList.remove("query-checked");}
            if(rbIndex==1){querySections[rbIndex-1].classList.remove("query-checked");}
            console.log("radio boton no está check")
            
            rbIndex++;
        }
    }        
    })
})

//submit process and validations.
submitBt.addEventListener("click", function(event){
    console.log("Submit Button has been clicked");
    console.log("content of radioButtons is: "+ radioButtons.toString());
    let emptyField= false; //turn into array, check if any field is empty with .some();
    let isEmpty= [];
    //validation for data fields (text areas and such)
    for(const field of dataFields){

        let value= field.value.trim();

        if(dataFields.indexOf(field)==2){

            if(!value.match(mailValidation)){

                field.classList.add("error-border");
                
            }
        }

        if(!value){
            field.classList.add("error-border");
            emptyField= true;
            isEmpty.push(true);
            fieldError[dataFields.indexOf(field)].classList.add("on-visibility");
        }else{
            field.classList.remove("error-border");
            fieldError[dataFields.indexOf(field)].classList.remove("on-visibility");
            emptyField= false;
            isEmpty.push(false);
        }        

    }

    //validates radio buttons
    let queryIndex=0;
        for(const radio of radioButtons){
            if(radio.checked){
                isChecked= true;
                break;
            }else{
                isChecked=false;
                queryIndex++;
            }
        }

        if(isChecked==true){
            isEmpty.push(false);
            radioError.classList.remove("on-visibility");
        }
        if(isChecked== false){
            isEmpty.push(true);
            radioError.classList.add("on-visibility");
        }

    //validates checkbox
    if(consentBt.checked){
        isEmpty.push(false);
        consentError.classList.remove("on-visibility");
    }else{
        isEmpty.push(true);
        consentError.classList.add("on-visibility");
    }

    
    //checks in the array if there's any empty field.
    const falseCheck = (element) => element=== true;
    
    if(!isEmpty.some(falseCheck)){
        console.log("empty fields log: " + isEmpty);
        
        successCard.classList.add("on-visibility");
        event.preventDefault();
        formulary.reset();
        formulary.disabled();
    }

    if(emptyField== true || isEmpty.some(falseCheck)){
        //console.log(isEmpty.some(falseCheck[0]));
        console.log("empty fields log: " + isEmpty);
        event.preventDefault();
    }


})

//manually resets the style changes to query sections
formulary.addEventListener("reset", function(){
    querySections.forEach(
        section=> section.classList.remove("query-checked")
    );
})