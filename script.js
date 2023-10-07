window.onload = () => {
  const regExName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  const regExEmail = /^[a-zA-Z0-9._-]+@northeastern\.edu$/; // Valid email domains restricted to @northeastern.edu
  const regExPhone = /\d{3}-?\d{3}-\d{4}$/;
  const regExZipcode = /^\d{5}$/; // Match exactly 5 digits
  // const regExStreetAddress = /^[a-zA-Z0-9\s,'.-]*$/;
  const regExStreetAddress = /^[a-zA-Z0-9\s,'.-]+$/;
  const regExCity = /^[A-Za-z]+$/;

  const display = (elementName, isInValid) => {
      if (isInValid) {
          document.getElementById(`error_${elementName}`).style.display = "block";
          document.myForm[elementName].style.border = "2px solid red";
      } else {
          document.getElementById(`error_${elementName}`).style.display = "none";
          document.myForm[elementName].style.border = "";
      }
  }

  let isNameInValid = true,
      isEmailInValid = true,
      isPhoneNumberInValid = true,
      isCityInValid = true,
      isZipcodeInValid = true,
      isStreetInvalid = true,
      isTitleInvalid = true,
      isCommentInvalid = true,
      isDropdownInvalid = true,
      isCheckboxInValid = true,
      isTextInValid = true;

  const validate = event => {
      const { id, value, name } = event.target;
      const minLength = 2; // Minimum length for fields (adjust as needed)
      const maxLength = 20; // Maximum length for fields (adjust as needed)

      switch (id) {
          case "firstname":
          case "lastname":
              if (!value.trim() || value.length < minLength || value.length > maxLength || !value.match(regExName)) {
                  display(name, true);
                  isNameInValid = true;
              } else {
                  display(name, false);
                  isNameInValid = false;
              }
              break;

          case "city":
          case "state":
              if (!value.trim() || value.length < minLength || value.length > maxLength || !value.match(regExCity)) {
                  display(name, true);
                  isCityInValid = true;
              } else {
                  display(name, false);
                  isCityInValid = false;
              }
              break;

          case "email":
              if (!value.trim() || !value.match(regExEmail)) {
                  display(name, true);
                  isEmailInValid = true;
              } else {
                  display(name, false);
                  isEmailInValid = false;
              }
              break;

          case "phoneNumber":
              if (!value.trim() || !value.match(regExPhone)) {
                  display(name, true);
                  isPhoneNumberInValid = true;
              } else {
                  display(name, false);
                  isPhoneNumberInValid = false;
              }
              break;
              
          case "zipcode":
              if (!value.trim() || !value.match(regExZipcode)) {
                  display(name, true);
                  isZipcodeInValid = true;
              } else {
                  display(name, false);
                  isZipcodeInValid = false;
              }
              break;

          case "streetaddress1":
          case "streetaddress2":
              const isStreetAddressNotEmpty = document.myForm.streetaddress1.value.trim() !== "";

              if(isStreetAddressNotEmpty){
                  isStreetInvalid = false;
              }    
              else{
                  isStreetInvalid = true;

              }
              break;
              // Handle other cases for your checkboxes and textarea here
          
          case "mr":
          case "miss":
          case "mrs":

              const titleInputs = document.querySelectorAll('input[name="title"]');
              const selectedTitle = Array.from(titleInputs).find(input => input.checked);
              
              // Validate each field
              const isTitleSelected = selectedTitle !== undefined;
              if(isTitleSelected){
                  isTitleInvalid = false;
              }
              else{
                  isTitleInvalid = true;

              }
              break;
           
          case "comment":
              const comments = document.myForm.comment.value;
              const isCommentsValid = comments.trim() !== '';
              if(isCommentsValid){
                  isCommentInvalid = false;
              }
              else{
                  isCommentInvalid = true;
              }
              break;
          
          case "howDidYouHear":
              var isHowDidYouHearValid = document.myForm.howDidYouHear.selectedIndex !== 0;
              if(isHowDidYouHearValid){
                  isDropdownInvalid = false;
              }
              else{
                  isDropdownInvalid = true;
              }
              break;

          case "checkbox1":
          case "checkbox2":
          case "checkbox3":

              var isHowDidYouHearValid = document.myForm.howDidYouHear.selectedIndex !== 0;
              var checkbox1 = document.myForm.checkbox1;
              var checkbox2 = document.myForm.checkbox2;
              var checkbox3 = document.myForm.checkbox3;
              var areCheckboxesValid = true; // Assume checkboxes are valid by default

              if (isHowDidYouHearValid) {
                  // If a valid option is selected in the dropdown, check if at least one checkbox is selected
                  areCheckboxesValid = checkbox1.checked || checkbox2.checked || checkbox3.checked;
                  if(areCheckboxesValid){
                      isCheckboxInValid = false;
                  }
                  else{
                      isCheckboxInValid = true;
                  }
              }
              console.log("isHowDidYouHearValid:", isHowDidYouHearValid);
              console.log("areCheckboxesValid:", areCheckboxesValid);
              break;
          
          case "textInput":
              var howDidYouHearDropdown = document.myForm.howDidYouHear;
              var isHowDidYouHearValid = howDidYouHearDropdown.selectedIndex !== 0; // Check if an option other than the default is selected

              // Check if the checkbox is selected when a specific option is chosen from the dropdown
              var checkbox1 = document.myForm.checkbox1;
              var checkbox2 = document.myForm.checkbox2;
              var checkbox3 = document.myForm.checkbox3;
              var areCheckboxesValid = true; // Assume checkboxes are valid by default

              if (isHowDidYouHearValid) {
                  // If a valid option is selected in the dropdown, check if at least one checkbox is selected
                  areCheckboxesValid = checkbox1.checked || checkbox2.checked || checkbox3.checked;
              }

              // Check if the text input field is empty when the corresponding checkbox is selected
              const textInput = document.myForm.textInput;
              let isTextInputValid = true; // Assume the text input is valid by default

              if (checkbox1.checked || checkbox2.checked || checkbox3.checked) {
                  // Check if either Checkbox 1 or Checkbox 2 is selected
                  isTextInputValid = textInput.value.trim() !== ''; // Check if the text input is not empty
                  if(isTextInputValid){
                      isTextInValid = false;
                  }
                  else{
                      isTextInValid = true;
                  }
              }
              break;

      }

      if (isNameInValid || isEmailInValid || isPhoneNumberInValid || isZipcodeInValid || isStreetInvalid || isCityInValid || isTitleInvalid || isDropdownInvalid || isCommentInvalid || isCheckboxInValid || isTextInValid) {
          document.myForm.submit.setAttribute('disabled', true);
      } else {
          document.myForm.submit.removeAttribute('disabled');
      }
  }

  function submitted(e) {
      e.preventDefault();
      
      createTableRow();
      clearForm();
      isNameInValid = true;
      isEmailInValid = true;
      isPhoneNumberInValid = true;
      isCityInValid = true;
      isZipcodeInValid = true;
      isStreetInvalid = true;
      isTitleInvalid = true;
      isCommentInvalid = true;
      isDropdownInvalid = true;
      isCheckboxInValid = true;
      isTextInValid = true;
      
  }

  // Create the table once
  const table = document.createElement('table');
  const tableHeaders = ["Title", "First Name", "Last Name", "Email ID", "Phone Number", "Street Address 1", "Street Address 2", "City", "State", "Zipcode", "Select Drinks", "Drink Type", "Instructions", "Comment"];
  const tableRow = table.insertRow();

  table.style.display = "none";

  for (const header of tableHeaders) {
      const th = document.createElement('th');
      th.textContent = header;
      tableRow.appendChild(th);
  }
  document.body.appendChild(table);

  // Function to create a new row in the table
  function createTableRow() {
      const form = document.forms["myForm"];
      
      // Get the selected "Title" value
      const selectedTitle = Array.from(document.querySelectorAll('input[name^="title"]'))
          .find(input => input.checked);
      const titleValue = selectedTitle ? selectedTitle.value : '';

      const formData = [
          titleValue,
          form.firstname.value,
          form.lastname.value,
          form.email.value,
          form.phoneNumber.value,
          form.streetaddress1.value,
          form.streetaddress2.value || "", // If blank, set to empty string
          form.city.value,
          form.state.value,
          form.zipcode.value,
          Array.from(form.howDidYouHear.selectedOptions).map(option => option.value).join(', '),
          getCheckedCheckboxes(form), // Get the checked checkboxes as a string with line breaks
          form.textInput.value,
          form.comment.value
      ];

      const dataRow = table.insertRow();
      for (const data of formData) {
          const td = document.createElement('td');
          td.textContent = data;
          dataRow.appendChild(td);
      }
      table.style.display = "table";
  }

  function getCheckedCheckboxes(form) {
      var checkboxappend = getCheckedCheckboxesAsString();
      const checkboxesArray = checkboxappend.split('\n');
      console.log(checkboxesArray);
      
      

      const checkedCheckboxes = [];
      if (form.checkbox1.checked) {
          checkedCheckboxes.push(checkboxesArray[0]);
      }
      if (form.checkbox2.checked) {
          checkedCheckboxes.push(checkboxesArray[1]);
      }
      if (form.checkbox3.checked) {
          checkedCheckboxes.push(checkboxesArray[2]);
      }
      return checkedCheckboxes;
  }

  function clearForm() {
      const form = document.forms["myForm"];

      // Reset all form fields
      const titleRadios = document.querySelectorAll('input[name^="title"]');
      titleRadios.forEach(radio => {
          radio.checked = false;
      });

      form.firstname.value = "";
      form.lastname.value = "";
      form.email.value = "";
      form.phoneNumber.value = "";
      form.streetaddress1.value = "";
      form.streetaddress2.value = "";
      form.city.value = "";
      form.state.value = "";
      form.zipcode.value = "";

      form.checkbox1.checked = false;
      form.checkbox2.checked = false;
      form.checkbox3.checked = false;

      form.howDidYouHear.selectedIndex = 0;

      form.textInput.value = "";

      form.comment.value = "";

      // Hide the checkbox and input fields
      document.getElementById("checkboxContainer").style.display = "none";
      document.getElementById("textInputContainer").style.display = "none";

      // Disable the submit button again
      document.myForm.submit.setAttribute('disabled', true);
  }

  

  const howDidYouHearDropdown = document.getElementById("howDidYouHear");
  const checkboxes = checkboxContainer.querySelectorAll("input[type='checkbox']");
  const textInputContainer = document.getElementById("textInputContainer");
  const textInput = document.getElementById("textInput");

  // Define the mapping of options to checkbox options
  const checkboxOptions = {
      "Hot Black Tea": ["Large Drink", "Medium Drink", "Small Drink"],
      "Cold Coffee": ["Cinnamon Coffee", "2% Milk", "Black Coffee"],
      "Orange Juice": ["Iced", "Sugar Free" , "Sweet"],
      "Mango Juice": ["Sugar Free", "With Ice-cream", "With grapes"],
      "Wine": ["Red Wine", "White Wine", "Rose Wine"]
  };

  howDidYouHearDropdown.addEventListener("change", () => {
      const selectedOption = howDidYouHearDropdown.value;
      const checkboxContainer = document.getElementById("checkboxContainer");

      if (selectedOption === "") {
          checkboxContainer.style.display = "none";
          textInputContainer.style.display = "none";
          textInput.required = true;
      } else {
          checkboxContainer.style.display = "block";
          checkboxes.forEach(checkbox => {
              checkbox.checked = false;
          });
          textInputContainer.style.display = "none";
          textInput.required = false;
      }

      // Populate the checkboxes based on the selected option
      if (checkboxOptions[selectedOption]) {
          checkboxes.forEach((checkbox, index) => {
              checkbox.checked = false;
              checkbox.parentNode.style.display = "block"; // Display the checkbox container
              checkbox.nextSibling.textContent = checkboxOptions[selectedOption][index];
          });
      }else if(selectedOption == ""){
          checkboxes.forEach(checkbox => {
              checkbox.checked = false;
              checkbox.parentNode.style.display = "none"; // Hide the checkbox container
          });
      } 
      else {
          checkboxes.forEach(checkbox => {
              checkbox.checked = false;
              checkbox.parentNode.style.display = "block"; // Hide the checkbox container
          });
      }
  });

  // Add event listener to each checkbox
  checkboxes.forEach(checkbox => {
      checkbox.addEventListener("change", () => {
          // Check if any checkbox is checked
          const isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

          // Toggle the visibility of the text input container based on checkbox state
          textInputContainer.style.display = isChecked ? "block" : "none";
          textInput.required = isChecked; // Make text input required when checkboxes are checked
      });
  });

  function getCheckedCheckboxesAsString() {
      const checkedCheckboxes = Array.from(checkboxes)
          .filter(checkbox => checkbox.checked)
          .map(checkbox => checkbox.nextSibling.textContent);
      return checkedCheckboxes.join('\n');
  }
  

  function hidetableheading(){
      table.style.display = "none";
  }

  document.myForm.addEventListener('input', validate);
  document.myForm.addEventListener('submit', submitted);
}