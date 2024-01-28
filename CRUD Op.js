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
    guid = guid.replace("{", "").replace("}", "");

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


