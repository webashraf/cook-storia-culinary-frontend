// "use server";

import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRETE_KEY);

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const res = NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
    // console.log("inside api", res.clientSecret);

    return res;
  } catch (err: any) {
    console.log("Internal Error:", error);
    return NextResponse.json(
      { error: `Internal Server Error ${error}` },
      { status: 500 }
    );
  }
}
