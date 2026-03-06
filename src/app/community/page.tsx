"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Hash,
  Users,
  Send,
  Plus,
  Shield,
  Star,
  BookOpen,
  Briefcase,
  Home,
  Heart,
  Bell,
  Search,
  Settings,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// 
// COMMUNITY CHANNELS
// 

const channels = [
  {
    id: "general",
    name: "General",
    icon: Hash,
    unread: 3,
    description: "General discussions and announcements",
  },
  {
    id: "integrity",
    name: "School of Integrity",
    icon: BookOpen,
    unread: 0,
    description: "Discussions on integrity principles",
  },
  {
    id: "purpose",
    name: "Purpose & Calling",
    icon: Star,
    unread: 7,
    description: "Discovering and walking in your purpose",
  },
  {
    id: "marketplace",
    name: "Marketplace Faith",
    icon: Briefcase,
    unread: 1,
    description: "Faith in the corporate world",
  },
  {
    id: "integrity-house",
    name: "Integrity Houses",
    icon: Home,
    unread: 0,
    description: "Local chapter discussions",
  },
  {
    id: "prayer",
    name: "Prayer Requests",
    icon: Heart,
    unread: 2,
    description: "Share and support prayer needs",
  },
];

// 
// SAMPLE MESSAGES
// 

const sampleMessages = [
  {
    id: "1",
    user: "Samuel Adetokunbo",
    avatar: "SA",
    message:
      "Just finished reading the latest blog post on Integrity. Truly transformative content. Let's keep building men of value!",
    time: "10:23 AM",
    role: "Moderator",
  },
  {
    id: "2",
    user: "John Doe",
    avatar: "JD",
    message: "Amen brother! The part about workplace integrity really spoke to me. Has anyone had experience implementing these principles in corporate settings?",
    time: "10:31 AM",
    role: "Member",
  },
  {
    id: "3",
    user: "David Okonkwo",
    avatar: "DO",
    message: "I run a small business and I've been applying the biblical principles of integrity. It's challenging but the rewards  both spiritual and practical  have been immense.",
    time: "10:45 AM",
    role: "Member",
  },
  {
    id: "4",
    user: "Michael Adebayo",
    avatar: "MA",
    message: "Great insights David! Would love to hear more about your journey. Maybe we should organize a sharing session during the next Integrity House meeting.",
    time: "11:02 AM",
    role: "Admin",
  },
  {
    id: "5",
    user: "Peter Obi",
    avatar: "PO",
    message: "Count me in! Also, has anyone registered for the upcoming Integrity Summit? Early bird registration closes next week.",
    time: "11:15 AM",
    role: "Member",
  },
];

// 
// ONLINE MEMBERS
// 

const onlineMembers = [
  { name: "Samuel A.", role: "Moderator" },
  { name: "John D.", role: "Member" },
  { name: "David O.", role: "Member" },
  { name: "Michael A.", role: "Admin" },
  { name: "Peter O.", role: "Member" },
  { name: "Emeka C.", role: "Member" },
  { name: "Femi J.", role: "Member" },
];

// 
// COMMUNITY PAGE
// 

export default function CommunityPage() {
  const [activeChannel, setActiveChannel] = useState("general");
  const [message, setMessage] = useState("");

  const currentChannel = channels.find((c) => c.id === activeChannel);

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Channel Sidebar */}
      <aside className="w-64 bg-zinc-900/50 border-r border-zinc-800/50 hidden lg:flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800/50">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-orange-500" />
            <h2 className="text-sm font-bold text-white">TIMN Community</h2>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
            <Input
              placeholder="Search..."
              className="pl-8 py-1.5 text-xs h-8"
            />
          </div>
        </div>

        {/* Channels */}
        <div className="flex-1 overflow-y-auto p-3 space-y-0.5">
          <p className="text-[10px] px-2 py-1.5 text-zinc-600 uppercase tracking-wider font-semibold">
            Channels
          </p>
          {channels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => setActiveChannel(channel.id)}
              className={`flex items-center justify-between w-full px-2.5 py-2 rounded-md text-sm transition-all ${
                activeChannel === channel.id
                  ? "bg-orange-500/10 text-orange-500"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/30"
              }`}
            >
              <span className="flex items-center gap-2">
                <channel.icon className="w-4 h-4" />
                <span className="truncate">{channel.name}</span>
              </span>
              {channel.unread > 0 && (
                <span className="bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {channel.unread}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* User Footer */}
        <div className="p-3 border-t border-zinc-800/50">
          <div className="flex items-center gap-2.5 px-2 py-1.5">
            <div className="w-7 h-7 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-xs font-bold text-orange-500">
              Y
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">You</p>
              <p className="text-[10px] text-green-400">Online</p>
            </div>
            <Settings className="w-3.5 h-3.5 text-zinc-500" />
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Channel Header */}
        <header className="px-6 py-3.5 border-b border-zinc-800/50 flex items-center justify-between bg-zinc-950/80 backdrop-blur-sm">
          <div>
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-orange-500" />
              <h2 className="text-sm font-bold text-white">
                {currentChannel?.name}
              </h2>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              {currentChannel?.description}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-zinc-500 hover:text-white transition-colors">
              <Bell className="w-4 h-4" />
            </button>
            <button className="text-zinc-500 hover:text-white transition-colors">
              <Users className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {/* Date Divider */}
          <div className="flex items-center gap-3 py-2">
            <div className="flex-1 h-px bg-zinc-800/50" />
            <span className="text-[10px] text-zinc-600 px-2">Today</span>
            <div className="flex-1 h-px bg-zinc-800/50" />
          </div>

          {sampleMessages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 group hover:bg-zinc-800/10 rounded-lg px-2 py-2 -mx-2 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-xs font-bold text-orange-500 shrink-0 mt-0.5">
                {msg.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-semibold text-white">
                    {msg.user}
                  </span>
                  {msg.role !== "Member" && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                        msg.role === "Admin"
                          ? "bg-orange-500/20 text-orange-500"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {msg.role}
                    </span>
                  )}
                  <span className="text-[10px] text-zinc-600">{msg.time}</span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {msg.message}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Message Input */}
        <div className="px-6 py-4 border-t border-zinc-800/50">
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 flex items-center justify-center transition-colors">
              <Plus className="w-4 h-4 text-zinc-400" />
            </button>
            <div className="flex-1 relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Message #${currentChannel?.name?.toLowerCase() || "general"}...`}
                className="pr-12"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && message.trim()) {
                    setMessage("");
                  }
                }}
              />
              <button
                className={`absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md flex items-center justify-center transition-all ${
                  message.trim()
                    ? "bg-orange-500 text-white"
                    : "bg-zinc-700/50 text-zinc-500"
                }`}
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Members Sidebar */}
      <aside className="w-56 bg-zinc-900/30 border-l border-zinc-800/50 hidden xl:block p-4">
        <p className="text-[10px] px-2 py-1.5 text-zinc-600 uppercase tracking-wider font-semibold mb-2">
          Online  {onlineMembers.length}
        </p>
        <div className="space-y-1">
          {onlineMembers.map((member) => (
            <div
              key={member.name}
              className="flex items-center gap-2.5 px-2 py-1.5 rounded-md hover:bg-zinc-800/30 transition-colors"
            >
              <div className="relative">
                <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700/50 flex items-center justify-center text-[10px] font-bold text-zinc-400">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-zinc-900" />
              </div>
              <div>
                <p className="text-xs text-zinc-300">{member.name}</p>
                <p className="text-[10px] text-zinc-600">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
