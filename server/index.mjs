import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: "TEST-7238239541132588-123116-5e915942a198814e530e812424878ae2-514242842",
});

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'OPTIONS'], // Ensure 'OPTIONS' is included
  // ... other cors options
}));

app.use(express.json());

app.options('/create_preference', cors()); // Add this OPTIONS route

app.get("/", (req, res) => {
  res.send("Servidor!");
});

app.post("/create_preference", async (req, res) => {
  try {
    console.log("Received data:", req.body);

    const body = {
      items: [
        {
          title: req.body.title,
          unit_price: Number(req.body.price),
          quantity: 1,
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: "https://www.instagram.com/tarot.sitaara/",
        failure: "https://www.instagram.com/tarot.sitaara/",
        pending: "https://www.instagram.com/tarot.sitaara/",
      },
      auto_return: "approved",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({
      id: result.id,
    });
  } catch (error) {
    console.error("Error creating preference:", error);
    res.status(500).json({
      error: "Error al crear la preferencia",
      details: error.message || "Internal Server Error",
    });
  }
});

app.listen(port, () => {
  console.log(`El servidor está corriendo en puerto ${port}`);
});
