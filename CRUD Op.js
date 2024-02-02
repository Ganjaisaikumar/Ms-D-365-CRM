// JavaScript source code
function onCreateEmployee(executionContext) {
    var formContext = executionContext.getFormContext();
    var emp_name = formContext.getAttribute("new_createemployee").getValue();
    var  guid_parent = formContext.data.entity.getId();
   // alert("before "+guid_parent);
    guid_parent = guid_parent.replace("{"," ").replace("}"," ");
    var entity = {};
    entity.new_name = emp_name;
    entity.new_isfresher = false;
    entity.new_haveyouworkedwithusbefore = false;
    entity.new_yearsofexperience = 100000002;
    entity["new_CompanyName@odata.bind"] = "/new_companies("+guid_parent+")";

    Xrm.WebApi.online.createRecord("new_employee", entity).then(
        function success(result) {
            var newEntityId = result.id;
        },
        function (error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
}


// function to update employee
function updateEmployee(executionContext) {
    var formContext = executionContext.getFormContext();
    var guid = formContext.data.entity.getId();

    //Condition to check Whether Reset field exists and reset value is true.
    if(formContext.getAttribute("new_reset") != null && formContext.getAttribute("new_reset").getValue() === true) {
        var entity = {};

        //Assigning the "guid: of company name "vin".
        entity["new_CompanyName@odata.bind"] = "/new_companies(6cf8d8ac-e4b0-ee11-a569-00224803b246)";
        entity.new_isfresher = true;


        //Pass the guid(guid of the record which can retrieved from UI url once you save the record!!)
        Xrm.WebApi.online.updateRecord("new_employee",guid, entity).then(
            function success(result) {
                var updatedEntityId = result.id;
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    }
}



function rerieveInfo(executionContext) {
    var formContext = executionContext.getFormContext();
    
    //if (formContext.getAttribute("new_reset").getValue() == true) 
    if (formContext.getAttribute("new_companyname") != null && formContext.getAttribute("new_companyname").getValue() != null) {

        var company_guid = formContext.getAttribute("new_companyname").getValue()[0].id;

        Xrm.WebApi.online.retrieveRecord("new_company",company_guid, "?$select=new_url").then(
            function success(result) {
                var new_url = result["new_url"];
                formContext.getAttribute("new_feedback").setValue(new_url);
                alert("data retrieved!!");
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );


    }
    
}


function deleteRecord(executionContext) {
    var formContext = executionContext.getFormContext();



    var company_guid = "dc0cab33-7dbd-ee11-9079-00224803b246";
    Xrm.WebApi.online.deleteRecord("new_employee", company_guid).then(
        function success(result) {
            //Success - No Return Data - Do Something
            alert("Arizona deleted!!");
        },
        function (error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
}


function updateOnOptionset(executionContext) {

    var formContext = executionContext.getFormContext();
    if (formContext.getAttribute("new_companyname") != null && formContext.getAttribute("new_companyname").getValue() != null) {
       // var guid = formContext.getAttribute("new_companyname").getValue()[0].id;
        var guid = formContext.data.entity.getId();
        alert("Guid of the record is " + guid);
       // var k = 100000002;
        var entity = {};
        entity.new_yearsofexperience = 100000002;

        Xrm.WebApi.online.updateRecord("new_employee", guid, entity).then(

            function success(result) {
                
              //  formContext.getAttribute("new_yearsofexperience").setValue(k);

                var updatedEntityId = result.id;
                alert("Success!");
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    }
}