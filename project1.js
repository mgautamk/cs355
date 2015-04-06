// Module dependencies
var express    = require('express'),
    mysql      = require('mysql');

// Application initialization
var connection = mysql.createConnection({
    host     : 'cwolf.cs.sonoma.edu',
    user     : 'mgautam',
    password : '4242477'
});

var app = module.exports = express.createServer();

// Database setup
connection.query('USE mgautam', function (err) {
    if (err) throw err;
});

// Configuration
app.use(express.bodyParser());

// Main page with two links to view the table and drop down menu
var htmlHeader = '<html><head><title>Car Dealership  Database</title></head><body>';
var htmlFooter = '</body></html>';

function handleError(res, error) {
    console.log(error);
    res.send(error.toString());
}

//buildUserView for Dealer Table
function buildUserViewDealer(result) {

    // Build the HTML table from the data in the Student table
    var responseHTML = htmlHeader + '<h1>Dealer Information</h1>';

    //Dynamic populating rows from the records returned
    for (var i=0; i < result.length; i++) {
        responseHTML += '<ul><li>Dealer ID: ' + result[i].DealerID + '</li>' +
            '<li>Name: ' + result[i].DealerName + '</li></ul>'
    }
    responseHTML += '</br>' +
	'<a href="/dealer/view/table">Go to Dealers Table</a></br></br>' + 
	'<a href="/">Go to Home</a></br></br>';
    responseHTML += htmlFooter;

    return responseHTML;
}

//buildUserView for Course Table
function buildUserViewDealerAddress(result) {

    // Build the HTML table from the data in the Student table                                                                                            
    var responseHTML = htmlHeader + '<h1>Dealer Name Address Information</h1>';

    //Dynamic populating rows from the records returned                                                                                                   
    for (var i=0; i < result.length; i++) {
        responseHTML += '<ul><li>Dealer Name: ' + result[i].DealerName + '</li>' +
	    '<li>City: ' + result[i].City + '</li>' +
	    '<li>State: ' + result[i].State + '</li>' +
            '<li>Zip: ' + result[i].Zip + '</li></ul>'
    }
    responseHTML += 
    '<a href="/">Go to Home</a></br>' + 
	'<a href="/address/view/table">Go to Dealer Address HTML Table</a></br></br>';
    responseHTML += htmlFooter;

    return responseHTML;
}

//buildUserView for Vehicle Table                                                                                                           
function buildUserViewVehicle(result) {

    // Build the HTML table from the data in the Vehicle table                                                                      
    var responseHTML = htmlHeader + '<h1>Vehicle Information</h1>';

    //Dynamic populating rows from the records returned                                                                             
    for (var i=0; i < result.length; i++) {
        responseHTML += '<ul><li>Vehicle ID: ' + result[i].VehicleID + '</li>' +
            '<li>Make: ' + result[i].Make + '</li>' +
            '<li>Model: ' + result[i].Model + '</li>' +
	    '<li>Year: ' + result[i].YEAR + '</li>' +
            '<li>Price: ' + result[i].PRICE + '</li></ul>'
    }
    responseHTML +=
    '<a href="/">Go to Home</a></br>' +
        '<a href="/vehicle/view/table">Vehicle HTML Table</a></br></br>';
    responseHTML += htmlFooter;

    return responseHTML;
}
//buildUserView for Customer
function buildUserViewCustomer(result) {
    // Build the HTML table from the data in the Customer table                                                                                  
    var responseHTML = htmlHeader + '<h1>Customer Information</h1>';

    //Dynamic populating rows from the records returned                                                                                          
    for (var i=0; i < result.length; i++) {
        responseHTML += '<ul><li>Customer ID: ' + result[i].CustomerID + '</li>' +
            '<li>FirstName: ' + result[i].FirstName + '</li>' +
            '<li>LastName: ' + result[i].LastName + '</li></ul>'
          }
    responseHTML +=
    '<a href="/">Go to Home</a></br>' +
        '<a href="/customer/view/table">Customer HTML Table</a></br></br>';
    responseHTML += htmlFooter;

    return responseHTML;
}
app.get('/', function(req, res) {
    req.query.name
    res.send('<html><head><title>Car Dealer Project One</title></head><body>' +
             '<a href="/dealer/view/table">Dealer HTML Table</a>' +
	     '<br />' +
             '<a href="/address/view/table">Dealer Address  HTML Table</a>' +
             '<br />' +
	     '<a href="/vehicle/view/table">Vehicle HTML Table</a>' +
             '<br />' +
	     '<a href="/customer/view/table">Customer HTML Table</a>' +
             '<br />' +
	     '<a href="/transaction/view/table">Transaction HTML Table</a>' +
             '<br />' +
             '</body></html>'
	    );
});

// HTML Example with data populated from Dealer table
app.get('/dealer/view/table', function (req, res) {
    var myQry = 'SELECT * FROM DEALER';
    console.log(myQry);
    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                // Build the HTML table from the data in the Dealer table
                var responseHTML = '<h1>Dealer Table</h1></br>' +
		    '<a href="/dealer/add">Add a Dealer</a></br></br>'; 
		    responseHTML += '<table border=1>' +
                    '<tr><th>Dealer ID</th>' +
                    '<th>Dealer Name</th>' +
                    '<th><!-- More Info Column --></th>' +
                    '<th><!-- Edit Info Column --></th>' +
                    '<th><!-- Delete Column --></th>' +
                    '</tr>';

                //Dynamic populating rows from the records returned
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<tr><td>' + result[i].DealerID + '</td>' +
                        '<td>' + result[i].DealerName + '</td>' +
                        '<td><a href="/dealer/?DealerID=' + result[i].DealerID + '">more info</a>' +
                        '<td><a href="/dealer/edit?DealerID=' + result[i].DealerID + '">edit</a>' +
                        '<td><a href="/dealer/delete?DealerID=' + result[i].DealerID + '">delete</a>' +
                        '</tr>'
                }

                responseHTML += '</table>' +
		    '</br>' + 
		    '<a href="/">Go to Home</a></br></br>';
                res.send(responseHTML);
            }
        }
    );
});

// HTML Table with data populated from the Dealer Address table                                                                    
app.get('/address/view/table', function (req, res) {
    var myQry = 'SELECT d.DealerID,d.DealerName,dr.City,dr.State,dr.Zip FROM DEALER d ' +
	'JOIN DEALERADDRESS dr on dr.DealerID = d.DealerID ' + 
	'ORDER BY DealerName';

    console.log(myQry);
    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                // Build the HTML table from the data in the Address table                                                                     
                var responseHTML = '<h1>Dealer Address Table</h1></br>' +
		'<a href="/dealer/address/add">Add Address for Dealer</a></br></br>';
                responseHTML += '<table border=1>' +
                    '<tr><th>Dealer ID</th>' +
		    '<th>Delar Name</th>' +
		    '<th>City</th>' +
		    '<th>State</th>' +
                    '<th>Zip</th>' +
                    '<th><!-- More Info Column --></th>' +
                    '<th><!-- Edit Info Column --></th>' +
                    '<th><!-- Delete Column --></th>' +
                    '</tr>';

                //Dynamic populating rows from the records returned                                                                 
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<tr><td>' + result[i].DealerID + '</td>' +
                        '<td>' + result[i].DealerName + '</td>' +
			'<td>' + result[i].City + '</td>' +
			'<td>' + result[i].State + '</td>' +
			'<td>' + result[i].Zip + '</td>' +
                        '<td><a href="/dealer/address/?DealerID=' + result[i].DealerID + '">more info</a>' +
                        '<td><a href="/dealer/address/edit?DealerID=' + result[i].DealerID + '">edit</a>' +
                        '<td><a href="/dealer/address/delete?DealerID=' + result[i].DealerID + '">delete</a>' +
                        '</tr>'
                }
                responseHTML += '</table>' +
		'</br>' +
		    '<a href="/">Go to Home</a></br></br>';
                res.send(responseHTML);
            }
        }
    );
});

//Display Information about transactions
app.get('/transaction/view/table', function (req, res) {
    var myQry = 'SELECT t.TransactionID,v.VehicleID,v.Make,v.Model,v.YEAR,v.PRICE,c.CustomerID,c.FirstName,c.LastName From TRANSACTION t ' +
        'LEFT JOIN VEHICLE v on t.VehicleID = v.VehicleID ' +
	'LEFT JOIN CUSTOMER c on t.CustomerID = c.CustomerID ' +
        'ORDER BY TransactionID';
    console.log(myQry);
    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                // Build the HTML table from the data in the Course table                                                                           
                var responseHTML = '<h1>Dealer Address Table</h1></br>' +
                '<a href="/transaction/add">Add Transaction</a></br></br>';
                responseHTML += '<table border=1>' +
                    '<tr><th>Transaction ID</th>' +
                    '<th>VehicleID</th>' +
		    '<th>Vehicle Make</th>' +
		    '<th>Vehicle Model</th>' +
		    '<th>Vehicle Year</th>' +
		    '<th>Vehicle Price</th>' +
                    '<th>CustomerID</th>' +
		    '<th>First Name</th>' +
		    '<th>Last Name</th>' +
                    '<th><!-- Delete Column --></th>' +
                    '</tr>';
                //Dynamic populating rows from the records returned                                                                                
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<tr><td>' + result[i].TransactionID + '</td>' +
                        '<td>' + result[i].VehicleID + '</td>' +
                        '<td>' + result[i].Make + '</td>' +
                        '<td>' + result[i].Model + '</td>' +
			'<td>' + result[i].YEAR + '</td>' +
                        '<td>' + result[i].PRICE + '</td>' +
			'<td>' + result[i].CustomerID + '</td>' +
			'<td>' + result[i].FirstName + '</td>' +
			'<td>' + result[i].LastName + '</td>' +
                        '<td><a href="/transaction/delete?TransactionID=' + result[i].TransactionID + '">delete</a>' +
                        '</tr>'
                }
                responseHTML += '</table>' +
                '</br>' +
                    '<a href="/">Go to Home</a></br></br>';
                res.send(responseHTML);
            }
        }
    );
});
//Deplay Information about Vehicles                                                                                           
app.get('/vehicle/view/table', function (req, res) {
    var myQry = 'SELECT * FROM VEHICLE';
    console.log(myQry);
    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                // Build the HTML table from the data in the Dealer table                                                         
                var responseHTML = '<h1>Vehicle Table</h1></br>' +
                    '<a href="/vehicle/add">Add a Vehicle</a></br></br>';
                    responseHTML += '<table border=1>' +
                    '<tr><th>Vehicle ID</th>' +
                    '<th>Make</th>' +
		    '<th>Model</th>' +
		    '<th>Year</th>' + 
		    '<th>Price</th>' +
                    '<th><!-- More Info Column --></th>' +
                    '<th><!-- Edit Info Column --></th>' +
                    '<th><!-- Delete Column --></th>' +
                    '</tr>';
                //Dynamic populating rows from the records returned
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<tr><td>' + result[i].VehicleID + '</td>' +
                        '<td>' + result[i].Make + '</td>' +
			'<td>' + result[i].Model + '</td>' +
			'<td>' + result[i].YEAR + '</td>' +
			'<td>' + result[i].PRICE + '</td>' +
                        '<td><a href="/vehicle/?VehicleID=' + result[i].VehicleID + '">more info</a>' +
                        '<td><a href="/vehicle/edit?VehicleID=' + result[i].VehicleID + '">edit</a>' +
                        '<td><a href="/vehicle/delete?VehicleID=' + result[i].VehicleID + '">delete</a>' +
                        '</tr>'
                }
                responseHTML += '</table>' +
                    '</br>' +
                    '<a href="/">Go to Home</a></br></br>';
                res.send(responseHTML);
            }
        }
    );
});

//Display Information about Customers
app.get('/customer/view/table', function (req, res) {
    var myQry = 'SELECT * FROM CUSTOMER';
    console.log(myQry);
    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                // Build the HTML table from the data in the Dealer table                                                                         
                var responseHTML = '<h1>Customer Table</h1></br>' +
                    '<a href="/customer/add">Add a Customer</a></br></br>';
                    responseHTML += '<table border=1>' +
                    '<tr><th>Customer ID</th>' +
                    '<th>First Name</th>' +
                    '<th>Last Name</th>' +
                    '<th><!-- More Info Column --></th>' +
                    '<th><!-- Edit Info Column --></th>' +
                    '<th><!-- Delete Column --></th>' +
                    '</tr>';
                //Dynamic populating rows from the records returned                                                                               
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<tr><td>' + result[i].CustomerID + '</td>' +
                        '<td>' + result[i].FirstName + '</td>' +
                        '<td>' + result[i].LastName + '</td>' +
                        '<td><a href="/customer/?CustomerID=' + result[i].CustomerID + '">more info</a>' +
                        '<td><a href="/customer/edit?CustomerID=' + result[i].CustomerID + '">edit</a>' +
                        '<td><a href="/customer/delete?CustomerID=' + result[i].CustomerID + '">delete</a>' +
                        '</tr>'
                }
                responseHTML += '</table>' +
                    '</br>' +
                    '<a href="/">Go to Home</a></br></br>';
                res.send(responseHTML);
            }
        }
    );
});


// Display information about a Dealer when given their DealerID
app.get('/dealer/', function (req, res) {
    var myQry = 'SELECT * FROM DEALER WHERE DealerID=' + req.query.DealerID;
    console.log(myQry);
    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.send(buildUserViewDealer(result));
            }
        }
    );
});

// Display information about a Dealers address when given their ID  
app.get('/dealer/address/', function (req, res) {
    var myQry = 'SELECT d.DealerName,ds.City,ds.State,ds.Zip FROM DEALERADDRESS ds ' + 
	'JOIN DEALER d ON d.DealerID=ds.DealerID ' +
	'WHERE d.DealerID=' + req.query.DealerID;
    console.log(myQry);
    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.send(buildUserViewDealerAddress(result));
            }
        }
    );
});

// Display information about a Dealer when given their DealerID  
app.get('/vehicle/', function (req, res) {
    var myQry = 'SELECT * FROM VEHICLE WHERE VehicleID=' + req.query.VehicleID;
    console.log(myQry);
    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.send(buildUserViewVehicle(result));
            }
        }
    );
});
//Display Information about a Customer when given a CustomerID
app.get('/customer/', function (req, res) {

    var myQry = 'SELECT * FROM CUSTOMER WHERE CustomerID=' + req.query.CustomerID;
    console.log(myQry);
    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.send(buildUserViewCustomer(result));
            }
        }
    );
});

// Add a Dealer
app.get('/dealer/add', function(req, res){

    var responseHTML = htmlHeader;

    responseHTML += '<h1>Insert a Dealer</h1>' +
        '<form action="/dealer/insert" method="GET">' +
        '<input type="hidden" name="DealerID" id="DealerID" />' +
        '<label for="name">Dealer Name</label> <input type="text" name="DealerName" id="DealerName" /><br />' +
        '<input type="submit" />' +
        '</form>';

    responseHTML += htmlFooter;
    res.send(responseHTML);
});

// Display a form that allows user to enter Dealers
app.get('/dealer/insert', function(req, res){

    var myQry = 'INSERT INTO DEALER (DealerName) VALUES (' +
       // '\'' + req.query.DealerName + '\', ' +
        '\'' + req.query.DealerName + '\' ' + 
        ')';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                connection.query('SELECT * FROM DEALER WHERE DealerID = ' + result.insertId,
                    function (err, result) {
                        if (err) {
                            handleError(res, err);
                        }
                        else if(result.length == 1) {
                            res.send(buildUserViewDealer(result));
                        }
                        else {
                            res.send('No Dealer found');
                        }
                    });
            }
        }
    );
});

//Add a Vehicle 
app.get('/vehicle/add', function(req, res){
    var responseHTML = htmlHeader;
    responseHTML += '<h1>Insert a Vehicle</h1>' +
        '<form action="/vehicle/insert" method="GET">' +
        '<input type="hidden" name="VehicleID" id="VehicleID" />' +
        '<label for="Make">Vehicle Make</label> <input type="text" name="Make" id="Make" /><br />' +
	'<label for="Model">Vehicle Model</label> <input type="text" name="Model" id="Model" /><br />' +
	'<label for="Year">Vehicle Year</label> <input type="text" name="Year" id="Year" /><br />' +
	'<label for="Price">Vehicle Price</label> <input type="text" name="Price" id="Price" /><br />' +                           
        '<input type="submit" />' +
        '</form>';
    responseHTML += htmlFooter;
    res.send(responseHTML);
});

//Display a form that allows uset to enter Vehicles
app.get('/vehicle/insert', function(req, res){
    var myQry = 'INSERT INTO VEHICLE (Make,Model,Year, Price) VALUES (' +
        '\'' + req.query.Make + '\', ' +
	'\'' + req.query.Model + '\', ' +
	 + req.query.Year + ',' +
	+ req.query.Price +
        ')';
    console.log(myQry);
    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                connection.query('SELECT * FROM VEHICLE WHERE VehicleID = ' + result.insertId,
                    function (err, result) {
                        if (err) {
                            handleError(res, err);
                        }
                        else if(result.length == 1) {
                           // res.send(buildUserViewCourse(result));
			    res.redirect('/vehicle/view/table');
                        }
                        else {
                            res.send('No Vehicle found for that Vehicle Number.');
                        }
                    });
            }
        }
    );
});
//Add a Customer
app.get('/customer/add', function(req, res){
    var responseHTML = htmlHeader;
    responseHTML += '<h1>Insert a Customer</h1>' +
        '<form action="/customer/insert" method="GET">' +
        '<input type="hidden" name="CustomerID" id="CustomerID" />' +
        '<label for="FirstName">First Name</label> <input type="text" name="FirstName" id="FirstName" /><br />' +
        '<label for="Model">Last Name</label> <input type="text" name="LastName" id="LastName" /><br />' +
        '<input type="submit" />' +
        '</form>';
    responseHTML += htmlFooter;
    res.send(responseHTML);
});

//Insert a Customer
app.get('/customer/insert', function(req, res){
    var myQry = 'INSERT INTO CUSTOMER (FirstName, LastName) VALUES (' +
        '\'' + req.query.FirstName + '\', ' +
        '\'' + req.query.LastName + '\'' +
        ')';
    console.log(myQry);
    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                connection.query('SELECT * FROM CUSTOMER WHERE CustomerID = ' + result.insertId,
                    function (err, result) {
                        if (err) {
                            handleError(res, err);
                        }
                        else if(result.length == 1) {
                            res.redirect('/customer/view/table');
                        }
                        else {
                            res.send('No Customer found for that CustomerID.');
                        }
                    });
            }
        }
    );
});

//route for adding an address for a dealer using dealer names using drop down menus
app.get('/dealer/address/add', function(req, res) {
    var allDealerQry = 'SELECT * FROM DEALER ORDER BY DealerName';
    connection.query(allDealerQry, function(err, DealerRS){
        if(err) {
            handleError(res, err);
        }
        // Build the HTML table from the data in the Dealer table
        var responseHTML = htmlHeader + '<h1>Add Address</h1>';
	
        responseHTML += '<form action="/dealer/address/insert" method="GET">';
	
        responseHTML += 'Dealer Name: <select id="DealerID" name="DealerID"> ';
        for(var i = 0; i < DealerRS.length; i++) {
            responseHTML += '<option value="' + DealerRS[i].DealerID + '">' + DealerRS[i].DealerName + '</option></br>';
	    console.log(DealerRS[i].DealerID);
        }
	
	responseHTML += '</select>' + 
	    '</br>' + 
	    '<label for="City">City</label> <input type="text" name="City" id="City" /><br />' +
	    '<label for="State">State</label> <input type="text" name="State" id="State" /><br />' +
	    '<label for="Zip">Zip</label> <input type="text" name="Zip" id="Zip" /><br />' +
            '<input type="submit" />' +
            '</form>';
      	
        res.send(responseHTML+htmlFooter);
	
    });
});

//Transaction add
app.get('/transaction/add', function(req, res) {
    var allVehicleQry = 'SELECT * FROM VEHICLE ORDER BY VehicleID';
    connection.query(allVehicleQry, function(err, VehicleRS){
        if(err) {
            handleError(res, err);
        }
	
	var allCustomerQuery = 'SELECT * FROM CUSTOMER ORDER BY CustomerID';
	connection.query(allCustomerQuery, function(err, CustomerRS){
            if(err) {
		handleError(res, err);
	    }
            // Build the HTML table from the data in the Vehicle  table                                                                                         
            var responseHTML = htmlHeader + '<h1>Add Transaction</h1>';

            responseHTML += '<form action="/transaction/insert" method="GET">';
            //VehicleID
            responseHTML += 'Vehicle ID: <select id="VehicleID" name="VehicleID"> ';
            for(var i = 0; i < VehicleRS.length; i++) {
		responseHTML += '<option value="' + VehicleRS[i].VehicleID + '">' + VehicleRS[i].VehicleID + '</option></br>';
            }
            responseHTML += '</select></br>';

	    //CustomerID
	    responseHTML += 'Customer Last Name: <select id="CustomerID" name="CustomerID"> ';
            for(var i = 0; i < CustomerRS.length; i++) {
                responseHTML += '<option value="' + CustomerRS[i].CustomerID + '">' + CustomerRS[i].LastName + '</option></br>';
            }
            responseHTML += '</select></br>' +
            '</br>' +
		'<input type="submit" />' +
		'</form>';
	    
            res.send(responseHTML+htmlFooter);
	    
	});
    });
});


// Insert address
app.get('/dealer/address/insert', function(req, res) {
    var qry = 'INSERT INTO DEALERADDRESS (DealerID, City, State, Zip) VALUES ('
	+ req.query.DealerID + ','
        + '\'' + req.query.City + '\',' 
        + '\'' + req.query.State + '\',' 
        + req.query.Zip + ')';

    console.log(qry);

    connection.query(qry, req.query, function(err, result) {
        if(err) {
            handleError(res, err);
        }
        else {
            //After inserting the rating forward to the list of ratings rout
            //res.redirect('/movie/grades/?Course_number=' + req.query.Course_number);
            res.redirect('/address/view/table');
        }
    });
});
//Transaction Insert
app.get('/transaction/insert', function(req, res) {
    var qry = 'INSERT INTO TRANSACTION (VehicleID, CustomerID) VALUES ('
	+ req.query.VehicleID + ','
        + req.query.CustomerID + ')';

    console.log(qry);

    connection.query(qry, req.query, function(err, result) {
        if(err) {
            handleError(res, err);
        }
        else {
            res.redirect('/transaction/view/table');

        }
    });
});

// Display information about a Dealer when given their DealerID and allow them to edit it.
app.get('/dealer/edit', function (req, res) {

    var myQry = 'SELECT * FROM DEALER WHERE DealerID=' + req.query.DealerID;

    console.log(myQry);

    connection.query(myQry, function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {

                // Build the HTML table from the data in the Dealer table
                var responseHTML = htmlHeader + '<h1>Edit Dealer Information</h1>';

                responseHTML += '<form action="/dealer/update" method="GET">';

                //Dynamic populating rows from the records returned
                if (result.length == 1) {
                    responseHTML += 'Name: <input type="text" name="name" id="name" value="' + result[0].DealerName + '" /><br />' +
                        '<input type="hidden" name="DealerID" id="DealerID" value="' + result[0].DealerID + '" />' +
                        '<input type="submit" />' +
                        '</form>' +
                        htmlFooter;

                    res.send(responseHTML);
                }
                else {
                    res.send('More than one record was returned.')
                }
            }
        }
    );
});

// Display information about Dealers address when given their DealerID and allow them to edit it.                                            
app.get('/dealer/address/edit', function (req, res) {
    var myQry = 'SELECT * FROM DEALERADDRESS WHERE DealerID=' + req.query.DealerID;
    console.log(myQry);
    connection.query(myQry, function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                // Build the HTML table from the data in the Dealer Address table
                var responseHTML = htmlHeader + '<h1>Edit Dealer Information</h1>';
                responseHTML += '<form action="/dealer/address/update" method="GET">';
                //Dynamic populating rows from the records returned 
                if (result.length == 1) {
                    responseHTML += 'City: <input type="text" name="City" id="City" value="' + result[0].City + '" /><br />' +
			'State: <input type="text" name="State" id="State" value="' + result[0].State + '" /><br />' +            
			'Zip: <input type="text" name="Zip" id="Zip" value="' + result[0].Zip + '" /><br />' +                                   
                        '<input type="hidden" name="DealerID" id="DealerID" value="' + result[0].DealerID + '" />' +
                        '<input type="submit" />' +
                        '</form>' +
                        htmlFooter;

                    res.send(responseHTML);
                }
                else {
                    res.send('More than one record was returned.')
                }
            }
        }
    );
});

// Display information about a Vehicle  when given their ID and allow them to edit it
app.get('/vehicle/edit', function (req, res) {
    var myQry = 'SELECT * FROM VEHICLE WHERE VehicleID=' + req.query.VehicleID;
    console.log(myQry);
    connection.query(myQry, function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                // Build the HTML table from the data in the Vehicle table               
                var responseHTML = htmlHeader + '<h1>Edit Vehicle Information</h1>';
                responseHTML += '<form action="/vehicle/update" method="GET">';
                //Dynamic populating rows from the records returned 
                if (result.length == 1) {
                    responseHTML += 'Vehicle Make: <input type="text" name="Make" id="Make" value="' + result[0].Make + '" /><br />' +
                        'Vehicle Model: <input type="text" name="Model" id="Model" value="' + result[0].Model + '" /><br />' + 
			'<input type="hidden" name="VehicleID" id="VehicleID" value="' + result[0].VehicleID + '" />' +
			'Vehicle Year: <input type="text" name="Year" id="Year" value="' + result[0].YEAR + '" /><br />' +
			'Price: <input type="text" name="Price" id="Price" value="' + result[0].PRICE + '" /><br />' +
                        '<input type="submit" />' +
                        '</form>' +
                        htmlFooter;
                    res.send(responseHTML);
                }
                else {
                    res.send('More than one record was returned.')
                }
            }
        }
    );
});

//Customer Edit
app.get('/customer/edit', function (req, res) {
    var myQry = 'SELECT * FROM CUSTOMER WHERE CustomerID=' + req.query.CustomerID;
    console.log(myQry);
    connection.query(myQry, function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                // Build the HTML table from the data in the Customer table                                                                                          
                var responseHTML = htmlHeader + '<h1>Edit Customer Information</h1>';
                responseHTML += '<form action="/customer/update" method="GET">';
                //Dynamic populating rows from the records returned                                                                                                
                if (result.length == 1) {
                    responseHTML += 'First Name: <input type="text" name="FirstName" id="FirstName" value="' + result[0].FirstName + '" /><br />' +
                        'Last Name: <input type="text" name="LastName" id="LastName" value="' + result[0].LastName + '" /><br />' +
                        '<input type="hidden" name="CustomerID" id="CustomerID" value="' + result[0].CustomerID + '" />' +
                        '<input type="submit" />' +
                        '</form>' +
                        htmlFooter;
                    res.send(responseHTML);
                }
                else {
                    res.send('More than one record was returned.')
                }
            }
        }
    );
});

// Update a Dealers given DealerID
app.get('/dealer/update', function (req, res) {
    var myQry = 'UPDATE DEALER SET DealerName="' + req.query.name + '" WHERE DealerID=' + req.query.DealerID; 
    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                connection.query('SELECT * FROM DEALER WHERE DealerID = ' + req.query.DealerID,
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            res.send('An error occurred');
                        }
                        if(result.length == 1) {
                            res.send(buildUserViewDealer(result));
                        }
                        else {
                            res.send('No Dealership found for that Dealership Number.');
                        }
                    });
            }
        }
    );
});

//Update a Dealers Address provided DealerID
app.get('/dealer/address/update', function (req, res) {
    var myQry = 'UPDATE DEALERADDRESS SET City="' + req.query.City + '", State="' + req.query.State + '", Zip="' + req.query.Zip + '"  WHERE DealerID=' + req.query.DealerID;
    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                connection.query('SELECT * FROM DEALERADDRESS WHERE DealerID = ' + req.query.DealerID,
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            res.send('An error occurred');
                        }
                        if(result.length == 1) {
                       //     res.send(buildUserViewDealerAddress(result));
			    res.redirect('/address/view/table');
                        }
                        else {
                            res.send('No Dealership found for that Dealership Number.');
                        }
                    });
            }
        }
    );
});

//Update Customer Information
app.get('/customer/update', function (req, res) {
    var myQry = 'UPDATE CUSTOMER SET FirstName="' + req.query.FirstName + '", LastName="' + req.query.LastName + '"  WHERE CustomerID=' + req.query.CustomerID;
    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                connection.query('SELECT * FROM CUSTOMER WHERE CustomerID = ' + req.query.CustomerID,
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            res.send('An error occurred');
                        }
                        if(result.length == 1) {                                                                    
                            res.redirect('/customer/view/table');
                        }
                        else {
                            res.send('No Customer found for that CustomerID');
                        }
                    });
            }
        }
    );
});

//Update Vehicle Information
app.get('/vehicle/update', function (req, res) {
    var myQry = 'UPDATE VEHICLE SET Make="' + req.query.Make + '",Model="' + req.query.Model + '",Year="' + req.query.Year + '",Price="' + req.query.Price + '" WHERE VehicleID=' + req.query.VehicleID;
    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                connection.query('SELECT * FROM VEHICLE WHERE VehicleID = ' + req.query.VehicleID,
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            res.send('An error occurred');
                        }
                        if(result.length == 1) {
                           // res.send(buildUserViewCourse(result));
			    res.redirect('/vehicle/view/table');
                        }
                        else {
                            res.send('No student found for that Student Number.');
                        }
                    });
            }
        }
    );
});

// Route for deleting a Dealer record from the database.
app.get('/dealer/delete', function (req, res) {
    var myQry = 'DELETE FROM DEALER WHERE DealerID=' + req.query.DealerID;
    console.log(myQry);
    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
		res.redirect('/dealer/view/table');
            }
        }
    );
});

//Route for deleting Dealers address from the Database
app.get('/dealer/address/delete', function (req, res) {
    var myQry = 'DELETE FROM DEALERADDRESS WHERE DealerID=' + req.query.DealerID;
    console.log(myQry);
    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
		res.redirect('/address/view/table');
            }
        }
    );
});

//Route for deleting a Vehicle record from the database
app.get('/vehicle/delete', function (req, res) {
    var myQry = 'DELETE FROM VEHICLE WHERE VehicleID=' + req.query.VehicleID;
    console.log(myQry);
    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
		res.redirect('/vehicle/view/table');
            }
        }
    );
});

//Route for deleting Transactions
app.get('/transaction/delete', function (req, res) {
    var myQry = 'DELETE FROM TRANSACTION WHERE TransactionID=' + req.query.TransactionID;
    console.log(myQry);
    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.redirect('/transaction/view/table');
            }
        }
    );
});

//Route for deleting a Customer account
app.get('/customer/delete', function (req, res) {
    var myQry = 'DELETE FROM CUSTOMER WHERE CustomerID=' + req.query.CustomerID;
    console.log(myQry);
    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.redirect('/customer/view/table');
            }
        }
    );
});
// Begin listening
app.listen(8012);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
