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
// Actualizar un libro
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, description, publication_year } = req.body;

    const { data, error } = await supabaseAnonClient
      .from("books")
      .update({ title, author, description, published_year })
      .eq("id", id);

    if (error) throw error;
    res.status(200).json({ data: data[0] });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar un libro
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabaseAnonClient
      .from("books")
      .delete()
      .eq("id", id);

    if (error) throw error;
    res.status(204).send(); // No content en response
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};