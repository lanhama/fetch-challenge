const validate_input = (req, res, next) => {
    try
    {
        const { retailer, purchaseDate, purchaseTime, total, items } = req.body;

        // Check if retailer is a non-empty string
        if (typeof retailer !== 'string' || retailer.trim() === '') {
            throw new Error('Retailer is required and must be a non-empty string.');
        }
    
        // Check if purchaseDate is a string in the expected format
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (typeof purchaseDate !== 'string' || !dateRegex.test(purchaseDate)) {
            throw new Error('Purchase date is required and must be in YYYY-MM-DD format.');
        }
    
        // Check if purchaseTime is a string in the expected format
        const timeRegex = /^\d{2}:\d{2}$/;
        if (typeof purchaseTime !== 'string' || !timeRegex.test(purchaseTime)) {
            throw new Error('Purchase time is required and must be in HH:MM format.');
        }
    
        // Check if total is a valid number
        if (isNaN(Number(total))) {
            throw new Error('Total must be a valid number.');
        }
    
        // Check if items is an array
        if (!Array.isArray(items)) {
            throw new Error('Items must be an array.');
        }
    
        next();
    }
    catch (err)
    {
        console.error(err.message);
        res.status(400).json({"error": err.message});
    }

};

exports.validate_input = validate_input;