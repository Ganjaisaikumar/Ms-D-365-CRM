function onsave() {

    //alert("triggered on save of record");
}
function onchangeofname() {
    var name = Xrm.Page.getAttribute("new_firstname").getValue();
    Xrm.Page.getAttribute("new_lastname").setValue(name);
}

function onchangeofemail(executionContext) {
    var formContext = executionContext.getFormContext();
    var email = formContext.getAttribute("new_emailaddress").getValue();
   // alert("Email Address Changed!!");


}


function setrequired(executionContext) {
    var formContext = executionContext.getFormContext();
    formContext.getAttribute("new_phonenumber").setRequiredLevel("required");
}


function optionsetofBanktype(executionContext) {

    var formContext = executionContext.getFormContext();
    var op = formContext.getAttribute("new_accountinfo").getValue();
    //alert("Value is " + op);
    if (op == "100000000") {

        formContext.getAttribute("new_accountnumber").setValue(123);
    }
    else if (op == "100000001") {

        formContext.getAttribute("new_accountnumber").setValue(456);
    }
    else if (op == "100000002") {

        formContext.getAttribute("new_accountnumber").setValue(789);
    }
    else {
        formContext.getAttribute("new_accountnumber").setValue(000);
    }

}

function disableautoSave(executionContext)// preventing of form auto save
{

    var saveEvent = executionContext.getEventArgs();
   // alert(saveEvent.getSaveMode());
    if (saveEvent.getSaveMode() == 70) {// when autosave funtion triggered the value will reurn 70 or 1!!
        saveEvent.preventDefault();
    }


}

function hideTab(executionContext) {
    var formContext = executionContext.getFormContext();

    if (formContext.getAttribute("new_isfresher") == 1) {
        formContext.ui.tabs.get("Employee Information").setVisible("False");
    }
    else if (formContext.getAttribute("new_isfresher") == 0 && formContext.getAttribute("new_isfresher") !=null ){
        formContext.ui.tabs.get("Employee Information").setVisible("True");
    }
   
}

function onControl(executionContext) {
    var formContext = executionContext.getFormContext();
    formContext.getControl("new_accountnumber").setDisabled(true);
}

function setDefault(executionContext) {
    var formContext = executionContext.getFormContext();
    var v = formContext.getAttribute("new_languages");
    if (v != null && v.getValue() === null) {
        v.setValue([1001,1003]);

    }
}

function defaultDob(executionContext) {

    var formContext = executionContext.getFormContext();
    //var dob = new Date();// 1/3/1999
    formContext.getAttribute("new_dob").setValue(new Date("1/3/1999"));

   }

function onDob(executionContext) {
    var formContext = executionContext.getFormContext();
    var birthDate = formContext.getAttribute("new_dob").getValue();
    var today = new Date();
    var min_years = new Date(today.getFullYear() - 21, today.getMonth(), today.getDate(), today.getHours(), today.getMinutes());
    var age = today.getFullYear() - birthDate.getFullYear();
    var msg = formContext.getControl("new_dob");
    //alert("Age is " + age);
    if (birthDate > min_years) {
        msg.setNotification("Min age should be 21!!", "birthDate");
    }
    else {
        msg.clearNotification("birthDate");
    }


 
}

function forlookUp(executionContext) {
    var formContext = executionContext.getFormContext();
    if (formContext.getAttribute("new_banklookup") != null && formContext.getAttribute("new_banklookup").getValue != null) {
        var name = formContext.getAttribute("new_banklookup").getValue()[0].name;
        var id = formContext.getAttribute("new_banklookup").getValue()[0].id;
        var entity_name = formContext.getAttribute("new_banklookup").getValue()[0].entityType;
       // alert("Guid is" + id);
       // alert("Name is" + name);
       // alert("Enirty Name" + entity_name);

    }

}

function setdefaultForLookUp(executionContext) {
    var formContext = executionContext.getFormContext();
    var name1 = [{
        id: "{4A20CA75-6EB6-EE11-A569-6045BD0853C3}",
        name: "Chime",
        entityType: "new_bank"
    }];

    
    formContext.getAttribute("new_banklookup").setValue(name1);

    //alert("Name is" + name1[0].name);

}

function hideSection(executionContext) {
    var formContext = executionContext.getFormContext();

    formContext.ui.tabs.get("tab_2").sections.get("tab_2_section_1").setVisible("False");

    
}
function getRecordGuid(executionContext) {
    var formContext = executionContext.getFormContext();
    
    var recordGuid = formContext.data.entity.getId();

    //alert("Record GUID: " + recordGuid);
}



