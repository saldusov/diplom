module.exports =  function(data, errors) {
	if(!data.email) errors.push("Email not found!");
	if(!data.name) errors.push("Name not found!");

	if(errors.length > 0) return false;
	return true;
}