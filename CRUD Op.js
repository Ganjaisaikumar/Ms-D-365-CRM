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
    var emp_name = formContext.getAttribute("new_createemployee").getValue();
    var guid_parent = formContext.data.entity.getId();
    // alert("before "+guid_parent);
    guid_parent = guid_parent.replace("{", " ").replace("}", " ");
}

