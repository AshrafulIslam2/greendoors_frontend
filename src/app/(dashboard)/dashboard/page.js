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
import { openModel, closeModel } from "@/state/helper_slice/modelOpenSlice";
import Model from "@/component/shared/Model";
import AddDepositForm from "@/component/Deposit/AddDepositForm";
import AddMemberForm from "@/component/Members/AddMemberForm";
import { useSession } from "next-auth/react";
import {
  useGetCashBalanceQuery,
  useGetMemberCashBalanceQuery,
} from "@/state/deposit/depositApiSlice";

const MetricCard = ({ title, value, change, changeType, icon, delay }) => {
  return (
    <div className="metric-card bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-2xl transition-all duration-300 cursor-pointer group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300">
            <span className="text-2xl">{icon}</span>
          </div>
          <h3 className="text-sm font-semibold text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
            {title
              .replace(/([A-Z])/g, " $1")
              .trim()
              .toUpperCase()}
          </h3>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
          {value} TK
        </p>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="metric-card bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          <div className="h-4 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-8 bg-gray-300 rounded w-20"></div>
      </div>
    </div>
  );
};

export default function Home() {
  const { data: session } = useSession();

  // Always call hooks at the top level
  const {
    data: associationBalance,
    isLoading: associationLoading,
    error: associationError,
  } = useGetCashBalanceQuery();

  const {
    data: memberBalance,
    isLoading: memberLoading,
    error: memberError,
  } = useGetMemberCashBalanceQuery(session?.user?.memberId, {
    skip: !session?.user?.memberId,
  });

  // Select the correct data based on role
  let cashBalanceData, cashBalanceLoading, cashBalanceError;
  if (session?.user?.role === "SUPER_ADMIN") {
    cashBalanceData = associationBalance;
    cashBalanceLoading = associationLoading;
    cashBalanceError = associationError;
  } else if (session?.user?.memberId) {
    cashBalanceData = memberBalance;
    cashBalanceLoading = memberLoading;
    cashBalanceError = memberError;
  }
  const cashBalanceArray = cashBalanceData?.data
    ? Object.entries(cashBalanceData.data).map(([key, value]) => ({
        title: key,
        value,
      }))
    : [];

  const filteredCashBalanceArray = cashBalanceArray.filter(
    (item) =>
      item.title !== "id" &&
      item.title !== "updatedAt" &&
      item.title !== "memberId"
  );
  console.log(
    "🚀 ~ Home ~ filteredCashBalanceArray:",
    filteredCashBalanceArray
  );
  const iconMap = {
    totalDeposit: "💰",
    totalExpense: "💳",
    totalInvestment: "🏦",
    totalProfit: "📈",
    totalLateFee: "⚠️",
    totalRegistrationFee: "📝",
    totalLoss: "📉",
    availableCash: "💵",
  };

  const dispatch = useDispatch();

  const [modalType, setModalType] = useState(""); // 'deposit' or 'member'

  const quickActions = [
    {
      name: "Add Deposit",
      icon: <PlusCircle className="w-6 h-6" />,
      color: "from-green-500 to-green-600",
      onClick: () => {
        setModalType("deposit");
        dispatch(openModel());
      },
    },
    {
      name: "Add Member",
      icon: <UserPlus className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
      onClick: () => {
        setModalType("member");
        dispatch(openModel());
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

  // Filter and map cashBalanceArray to MetricCard, skipping "id" and "updatedAt"

  useEffect(() => {
    // Only run animation if we have data
    if (filteredCashBalanceArray.length === 0) return;

    const animateContent = () => {
      // Kill any existing animations to prevent conflicts
      gsap.killTweensOf(".metric-card");
      gsap.killTweensOf(".quick-actions");
      gsap.killTweensOf(".dashboard-header");

      // Set initial states WITHOUT opacity: 0 (cards stay visible)
      gsap.set(".metric-card", {
        y: 30,
        scale: 0.95,
        rotation: -2,
      });
      gsap.set(".quick-actions", { y: 20 });

      // Create timeline for better control
      const tl = gsap.timeline();

      // Header animation
      tl.fromTo(
        ".dashboard-header",
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        }
      );

      // Cards animation with stagger - NO opacity change
      tl.to(
        ".metric-card",
        {
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: {
            amount: 0.3,
            from: "start",
          },
          ease: "back.out(1.1)",
        },
        "-=0.5"
      );

      // Quick actions animation
      tl.to(
        ".quick-actions",
        {
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // Add hover animations after initial animation completes
      tl.call(() => {
        const cards = document.querySelectorAll(".metric-card");

        // Remove existing listeners first
        cards.forEach((card) => {
          card.removeEventListener("mouseenter", card._mouseEnterHandler);
          card.removeEventListener("mouseleave", card._mouseLeaveHandler);
        });

        // Add new listeners
        cards.forEach((card) => {
          const handleMouseEnter = () => {
            gsap.to(card, {
              scale: 1.03,
              y: -5,
              rotation: 0.5,
              duration: 0.3,
              ease: "power2.out",
            });
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              scale: 1,
              y: 0,
              rotation: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          };

          // Store handlers on the element for cleanup
          card._mouseEnterHandler = handleMouseEnter;
          card._mouseLeaveHandler = handleMouseLeave;

          card.addEventListener("mouseenter", handleMouseEnter);
          card.addEventListener("mouseleave", handleMouseLeave);
        });
      });
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(animateContent, 100);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);

      // Kill animations
      gsap.killTweensOf(".metric-card");
      gsap.killTweensOf(".quick-actions");
      gsap.killTweensOf(".dashboard-header");

      // Remove event listeners
      const cards = document.querySelectorAll(".metric-card");
      cards.forEach((card) => {
        if (card._mouseEnterHandler) {
          card.removeEventListener("mouseenter", card._mouseEnterHandler);
          card.removeEventListener("mouseleave", card._mouseLeaveHandler);
        }
      });
    };
  }, [filteredCashBalanceArray.length]); // Re-run when data changes
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
            {cashBalanceLoading ? (
              // Show loading skeleton while data is fetching
              Array.from({ length: 6 }).map((_, index) => (
                <LoadingSkeleton key={index} />
              ))
            ) : cashBalanceError ? (
              // Show error state
              <div className="col-span-full text-center py-8">
                <p className="text-red-500 text-lg">
                  Error loading financial data. Please try again.
                </p>
              </div>
            ) : filteredCashBalanceArray.length > 0 ? (
              // Show actual data
              filteredCashBalanceArray.map((metric, index) => (
                <MetricCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  icon={iconMap[metric.title] || "ℹ️"}
                />
              ))
            ) : (
              // Show empty state
              Array.from({ length: 6 }).map((_, index) => (
                <LoadingSkeleton key={index} />
              ))
            )}
          </div>
        </div>

        {session?.user?.role === "SUPER_ADMIN" && (
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
        )}
        {/* Quick Actions Section */}

        {/* Stats Summary */}
        <div className="max-w-7xl mx-auto mt-12">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 lg:p-8 text-white shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <p className="text-3xl lg:text-4xl font-bold">30 Lac</p>
                <p className="text-blue-100">Total Invested</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl lg:text-4xl font-bold">72</p>
                <p className="text-blue-100">Total Projects</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl lg:text-4xl font-bold">60</p>
                <p className="text-blue-100">Active Members</p>
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
