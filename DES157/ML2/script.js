(function() {
    'use strict';
    console.log("reading js");


    const myForm = document.querySelector('#myform');
    const madlib = document.querySelector('#madlib');

    myForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const noun = document.querySelector('#noun').value;
        const verb = document.querySelector('#verb').value;
        const food = document.querySelector('#food').value;
        const adj = document.querySelector('#adj').value;


        let myText;

     
        if (noun && verb && food && adj) {
            myText = `Hello <span style="color:blue;font-weight:bold">${noun}</span> , first you get up from the bed, and then you <span style="color:blue;font-weight:bold">${verb}</span> out of your house.
             You see your favorite <span style="color:blue;font-weight:bold">${food}</span> on the street. You can't wait to rush to buy. The way you eat is very <span style="color:blue;font-weight:bold">${adj}</span>.
              After you finish eating, you choose to throw the garbage into the trash can.`;
        } else {
            alert("Please fill out the words");
        }

        // put text into the article with the id of madlib, 
        // but the section overlay is still hidden
        madlib.innerHTML = myText;

        // turn on the overlay
        document.getElementById('overlay').className = "showing";

        // turn off the form
        myForm.className = "hidden";



        //clear form after submit
        var formData = document.querySelectorAll("input[type=text]");

        for (const eachField of formData) {
            eachField.value = "";
        }

    });

    document.querySelector('.close').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('overlay').className = "hidden";
        myForm.className = "showing";
    });

}());