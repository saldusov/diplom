module.exports =  function(data, errors) {
	if(!data.userId) errors.push("User not found!");
	if(!data.goodId) errors.push("Good not found!");

	if(errors.length > 0) return false;
	return true;
}