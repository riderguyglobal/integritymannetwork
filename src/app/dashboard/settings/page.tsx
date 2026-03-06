"use client";

import { useState } from "react";
import { User, Lock, Bell, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white font-display">
              Account Settings
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Manage your profile and preferences.
            </p>
          </div>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4" />
            {saved ? "Saved!" : "Save Changes"}
          </Button>
        </div>

        <div className="space-y-6">
          {/* Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-4 h-4 text-orange-400" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-1.5">
                    First Name
                  </label>
                  <Input placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-1.5">
                    Last Name
                  </label>
                  <Input placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">
                  Email
                </label>
                <Input type="email" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">
                  Phone
                </label>
                <Input type="tel" placeholder="+234 812 345 6789" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-1.5">
                    City
                  </label>
                  <Input placeholder="Lagos" />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-1.5">
                    Country
                  </label>
                  <Input placeholder="Nigeria" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Password */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lock className="w-4 h-4 text-orange-400" />
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">
                  Current Password
                </label>
                <Input type="password" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">
                  New Password
                </label>
                <Input type="password" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">
                  Confirm New Password
                </label>
                <Input type="password" />
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="w-4 h-4 text-orange-400" />
                Email Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Community updates and announcements", default: true },
                { label: "New blog posts", default: true },
                { label: "Event reminders", default: true },
                { label: "Order and shipping updates", default: true },
                { label: "Promotional offers", default: false },
              ].map((pref) => (
                <label
                  key={pref.label}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    defaultChecked={pref.default}
                    className="w-4 h-4 rounded bg-zinc-800 border-zinc-700 text-orange-500 focus:ring-orange-500/20"
                  />
                  <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                    {pref.label}
                  </span>
                </label>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
