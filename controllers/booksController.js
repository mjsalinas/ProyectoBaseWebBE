const { createClient } = require("@supabase/supabase-js");

const supabaseAnonClient = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

exports.getAllBooks = async (req, res) => {
    try {
        const { data, error } = await supabaseAnonClient
            .from("books")
            .select("*");
        if (error) throw error;
        res.status(200).json({ data });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
    return res;
};
exports.createBook = async (req, res) => {

    try {
        const { title, author, description, publisher, published_year, genre,
            cover_image_url } = req.body;

        const { data, error } = await supabaseAnonClient
            .from('books')
            .insert({
                title, author, description, publisher, published_year, genre,
                cover_image_url
            });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
    return res;
};
// exports.updateBook = async (req, res) => {
//     const { data, error } = ;

//     return res;
// };
// exports.deleteBook = async (req, res) => {
//     const { data, error } = ;

//     return res;
// };