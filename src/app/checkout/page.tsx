"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Shield,
  Lock,
  CreditCard,
  ChevronLeft,
  Check,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/stores";
import { formatCurrency } from "@/lib/utils";

type Step = "shipping" | "payment" | "review";

export default function CheckoutPage() {
  const { items, subtotal, totalItems } = useCartStore();
  const [step, setStep] = useState<Step>("shipping");
  const [paymentMethod, setPaymentMethod] = useState<
    "paystack" | "stripe" | "paypal"
  >("paystack");

  const shippingCost = subtotal() > 50000 ? 0 : 3500;
  const total = subtotal() + shippingCost;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white font-display mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-zinc-500 mb-6">
            Add items to your cart to proceed to checkout.
          </p>
          <Button asChild>
            <Link href="/store">Browse Store</Link>
          </Button>
        </div>
      </div>
    );
  }

  const steps: { key: Step; label: string; icon: typeof Truck }[] = [
    { key: "shipping", label: "Shipping", icon: Truck },
    { key: "payment", label: "Payment", icon: CreditCard },
    { key: "review", label: "Review", icon: Check },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/store"
            className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white font-display">
            Checkout
          </h1>
          <div className="flex items-center gap-1 ml-auto text-xs text-zinc-500">
            <Lock className="w-3.5 h-3.5" />
            Secure Checkout
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {steps.map((s, idx) => {
            const isActive = s.key === step;
            const stepIndex = steps.findIndex((x) => x.key === step);
            const isDone = idx < stepIndex;
            return (
              <div key={s.key} className="flex items-center gap-3">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
                    isActive
                      ? "bg-orange-500/10 border border-orange-500/30 text-orange-500 dark:text-orange-400"
                      : isDone
                      ? "bg-green-500/10 border border-green-500/30 text-green-400"
                      : "bg-zinc-100 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-800/50 text-zinc-500"
                  }`}
                >
                  {isDone ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <s.icon className="w-4 h-4" />
                  )}
                  {s.label}
                </div>
                {idx < steps.length - 1 && (
                  <div className="w-8 h-px bg-zinc-100 dark:bg-zinc-800" />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Sections */}
          <div className="lg:col-span-2 space-y-6">
            {/* SHIPPING */}
            {step === "shipping" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800/50 p-6 space-y-5"
              >
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Truck className="w-5 h-5 text-orange-500 dark:text-orange-400" />
                  Shipping Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-zinc-500 dark:text-zinc-400 mb-1.5">
                      First Name
                    </label>
                    <Input placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-500 dark:text-zinc-400 mb-1.5">
                      Last Name
                    </label>
                    <Input placeholder="Doe" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-zinc-500 dark:text-zinc-400 mb-1.5">
                    Email
                  </label>
                  <Input type="email" placeholder="john@example.com" />
                </div>

                <div>
                  <label className="block text-sm text-zinc-500 dark:text-zinc-400 mb-1.5">
                    Phone
                  </label>
                  <Input type="tel" placeholder="+234 812 345 6789" />
                </div>

                <div>
                  <label className="block text-sm text-zinc-500 dark:text-zinc-400 mb-1.5">
                    Address
                  </label>
                  <Input placeholder="123 Main Street" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-zinc-500 dark:text-zinc-400 mb-1.5">
                      City
                    </label>
                    <Input placeholder="Lagos" />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-500 dark:text-zinc-400 mb-1.5">
                      State
                    </label>
                    <Input placeholder="Lagos" />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-500 dark:text-zinc-400 mb-1.5">
                      Country
                    </label>
                    <Input placeholder="Nigeria" />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button onClick={() => setStep("payment")}>
                    Continue to Payment
                  </Button>
                </div>
              </motion.div>
            )}

            {/* PAYMENT */}
            {step === "payment" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800/50 p-6 space-y-5"
              >
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-orange-500 dark:text-orange-400" />
                  Payment Method
                </h2>

                <div className="space-y-3">
                  {[
                    {
                      id: "paystack" as const,
                      label: "Paystack",
                      desc: "Pay with card, bank transfer, or USSD",
                    },
                    {
                      id: "stripe" as const,
                      label: "Stripe",
                      desc: "International card payments",
                    },
                    {
                      id: "paypal" as const,
                      label: "PayPal",
                      desc: "Pay with your PayPal account",
                    },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? "border-orange-500/30 bg-orange-500/5"
                          : "border-zinc-200 dark:border-zinc-800/50 bg-zinc-100/50 dark:bg-zinc-800/20 hover:border-zinc-300 dark:hover:border-zinc-700/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                        className="w-4 h-4 text-orange-500 bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 focus:ring-orange-500/20"
                      />
                      <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-white">
                          {method.label}
                        </p>
                        <p className="text-xs text-zinc-500">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="flex justify-between pt-2">
                  <Button
                    variant="ghost"
                    onClick={() => setStep("shipping")}
                  >
                    Back
                  </Button>
                  <Button onClick={() => setStep("review")}>
                    Review Order
                  </Button>
                </div>
              </motion.div>
            )}

            {/* REVIEW */}
            {step === "review" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800/50 p-6 space-y-5"
              >
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Check className="w-5 h-5 text-orange-500 dark:text-orange-400" />
                  Order Review
                </h2>

                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-3 border-b border-zinc-200 dark:border-zinc-800/30 last:border-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-white">
                          {item.name}
                        </p>
                        <p className="text-xs text-zinc-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm text-zinc-900 dark:text-white font-medium">
                        {formatCurrency(
                          (item.salePrice ?? item.price) * item.quantity
                        )}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-3 border-t border-zinc-200 dark:border-zinc-800/50">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500 dark:text-zinc-400">Subtotal</span>
                    <span className="text-zinc-900 dark:text-white">
                      {formatCurrency(subtotal())}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500 dark:text-zinc-400">Shipping</span>
                    <span className="text-zinc-900 dark:text-white">
                      {shippingCost === 0
                        ? "Free"
                        : formatCurrency(shippingCost)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold pt-2 border-t border-zinc-200 dark:border-zinc-800/50">
                    <span className="text-zinc-900 dark:text-white">Total</span>
                    <span className="text-orange-500 dark:text-orange-400">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <Button
                    variant="ghost"
                    onClick={() => setStep("payment")}
                  >
                    Back
                  </Button>
                  <Button className="gap-2">
                    <Lock className="w-4 h-4" />
                    Place Order  {formatCurrency(total)}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800/50 p-6 sticky top-24">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-md bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 flex items-center justify-center shrink-0">
                      <ShoppingBag className="w-4 h-4 text-zinc-400 dark:text-zinc-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-zinc-900 dark:text-white truncate">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-zinc-500">
                        {item.quantity}  {formatCurrency(item.salePrice ?? item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t border-zinc-200 dark:border-zinc-800/50">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500 dark:text-zinc-400">Subtotal</span>
                  <span className="text-zinc-900 dark:text-white">
                    {formatCurrency(subtotal())}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500 dark:text-zinc-400">Shipping</span>
                  <span className="text-zinc-900 dark:text-white">
                    {shippingCost === 0 ? "Free" : formatCurrency(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-zinc-200 dark:border-zinc-800/50">
                  <span className="text-zinc-900 dark:text-white">Total</span>
                  <span className="text-orange-500 dark:text-orange-400">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800/50 space-y-2">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <Shield className="w-3.5 h-3.5 text-green-400" />
                  Secure checkout  SSL encrypted
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <Truck className="w-3.5 h-3.5 text-green-400" />
                  Free shipping over 50,000
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
