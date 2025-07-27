"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import {
  UserPlus,
  FolderPlus,
  PlusCircle,
  Settings as SettingsIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { openModle, closeModel } from "@/state/helper_slice/modelOpenSlice";
import Model from "@/component/shared/Model";
import AddDepositForm from "@/component/Deposit/AddDepositForm";
import AddMemberForm from "@/component/Members/AddMemberForm";

const MetricCard = ({ title, value, change, changeType, icon, delay }) => {
  return (
    <div
      className="metric-card bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
      style={{ opacity: 0, transform: "translateY(30px)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300">
            <span className="text-2xl">{icon}</span>
          </div>
          <h3 className="text-sm font-semibold text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
            {title}
          </h3>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
          {value}
        </p>
        <div className="flex items-center space-x-2">
          <span
            className={`text-sm font-semibold px-2 py-1 rounded-full ${
              changeType === "positive"
                ? "text-green-700 bg-green-100"
                : "text-red-700 bg-red-100"
            }`}
          >
            {changeType === "positive" ? "↗" : "↘"} {change}
          </span>
          <span className="text-sm text-gray-500">from last month</span>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  useEffect(() => {
    // Header animation
    gsap.fromTo(
      ".dashboard-header",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Cards stagger animation
    gsap.fromTo(
      ".metric-card",
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.4,
      }
    );

    // Quick actions animation
    gsap.fromTo(
      ".quick-actions",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 1.2,
      }
    );

    // Hover animations
    const cards = document.querySelectorAll(".metric-card");
    cards.forEach((card) => {
      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.05,
          y: -5,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    });

    // Button hover animations
    const buttons = document.querySelectorAll(".action-btn");
    buttons.forEach((button) => {
      const handleMouseEnter = () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.2,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        });
      };

      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);
    });
  }, []);

  const metrics = [
    {
      title: "Total Deposit",
      value: "$124,532",
      change: "+12.5%",
      changeType: "positive",
      icon: "💰",
      delay: 0,
    },
    {
      title: "Total Fine",
      value: "$3,247",
      change: "-5.2%",
      changeType: "negative",
      icon: "⚠️",
      delay: 0.1,
    },
    {
      title: "Total Profit",
      value: "$89,642",
      change: "+18.3%",
      changeType: "positive",
      icon: "📈",
      delay: 0.2,
    },
    {
      title: "Total Investment",
      value: "$256,891",
      change: "+8.7%",
      changeType: "positive",
      icon: "🏦",
      delay: 0.3,
    },
    {
      title: "Cash in Hand",
      value: "$42,156",
      change: "+3.1%",
      changeType: "positive",
      icon: "💵",
      delay: 0.4,
    },
    {
      title: "Total Expenses",
      value: "$18,934",
      change: "+2.4%",
      changeType: "positive",
      icon: "💳",
      delay: 0.5,
    },
  ];

  const dispatch = useDispatch();

  const [modalType, setModalType] = useState(""); // 'deposit' or 'member'

  const quickActions = [
    {
      name: "Add Deposit",
      icon: <PlusCircle className="w-6 h-6" />,
      color: "from-green-500 to-green-600",
      onClick: () => {
        setModalType("deposit");
        dispatch(openModle());
      },
    },
    {
      name: "Add Member",
      icon: <UserPlus className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
      onClick: () => {
        setModalType("member");
        dispatch(openModle());
      },
    },
    {
      name: "Add Project",
      icon: <FolderPlus className="w-6 h-6" />,
      color: "from-emerald-500 to-emerald-600",
      onClick: null,
    },
    {
      name: "Settings",
      icon: <SettingsIcon className="w-6 h-6" />,
      color: "from-gray-500 to-gray-600",
      onClick: null,
    },
  ];

  return (
    <div className="h-[inherit] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.1)_1px,transparent_0)] bg-[size:24px_24px] opacity-30"></div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="dashboard-header mb-8 sm:mb-12">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4">
              Financial Dashboard
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Monitor financial metrics and track performance across all key
              indicators in real-time
            </p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {metrics.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                changeType={metric.changeType}
                icon={metric.icon}
                delay={metric.delay}
              />
            ))}
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="max-w-7xl mx-auto">
          <div
            className="quick-actions bg-white/90 backdrop-blur-sm rounded-3xl p-6 lg:p-8 shadow-xl border border-gray-200/50"
            style={{ opacity: 0, transform: "translateY(30px)" }}
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 text-center">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className={`action-btn p-4 lg:p-6 bg-gradient-to-r ${action.color} text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 flex flex-col items-center space-y-2 group`}
                  onClick={action.onClick ? action.onClick : undefined}
                  type="button"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {action.icon}
                  </span>
                  <span className="text-sm lg:text-base">{action.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="max-w-7xl mx-auto mt-12">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 lg:p-8 text-white shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <p className="text-3xl lg:text-4xl font-bold">98.5%</p>
                <p className="text-blue-100">Success Rate</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl lg:text-4xl font-bold">$2.4M</p>
                <p className="text-blue-100">Total Volume</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl lg:text-4xl font-bold">156</p>
                <p className="text-blue-100">Active Accounts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Model
        modelTitle={
          modalType === "deposit"
            ? "Add New Deposit"
            : modalType === "member"
            ? "Add New Member"
            : ""
        }
      >
        {modalType === "deposit" ? <AddDepositForm /> : null}
        {modalType === "member" ? <AddMemberForm /> : null}
      </Model>
    </div>
  );
}
