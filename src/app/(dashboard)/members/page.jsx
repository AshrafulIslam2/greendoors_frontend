import React from "react";
import {
  User,
  Phone,
  Mail,
  Droplets,
  Search,
  Filter,
  Grid,
  List,
} from "lucide-react";
import AddMember from "@/component/Members/AddMember";
import Model from "@/component/shared/Model";
import AddMemberForm from "@/component/Members/AddMemberForm";
const members = [
  {
    id: "M001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bloodGroup: "A+",
    image:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "M002",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 234-5678",
    bloodGroup: "O-",
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "M003",
    name: "Michael Chen",
    email: "m.chen@example.com",
    phone: "+1 (555) 345-6789",
    bloodGroup: "B+",
    image:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "M004",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 456-7890",
    bloodGroup: "AB+",
    image:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "M005",
    name: "David Wilson",
    email: "d.wilson@example.com",
    phone: "+1 (555) 567-8901",
    bloodGroup: "O+",
    image:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "M006",
    name: "Lisa Anderson",
    email: "lisa.a@example.com",
    phone: "+1 (555) 678-9012",
    bloodGroup: "A-",
    image:
      "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];
const page = () => (
  <>
    <div className="h-[inherit] bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl h-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8 flex  flex-col  items-start sm:flex-row justify-between sm:items-center">
          <div>
            <div className="flex items-center gap-3 sm:mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Member Directory
              </h1>
            </div>
            <p className="text-gray-600 text-lg mb-2 sm:mb-0">
              Browse all registered members
            </p>
          </div>
          <AddMember />
        </div>

        {/* Search and Filter Bar */}
        {/* <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-3xl p-6 mb-8 shadow-xl shadow-black/5"> */}
        {/* <div className="flex flex-col lg:flex-row gap-4"> */}
        {/* Search Input */}
        {/* <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search members by name, ID, or email..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div> */}

        {/* Filter Buttons */}
        {/* <div className="flex gap-3">
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl hover:from-blue-100 hover:to-purple-100 transition-all duration-300">
                <Filter className="w-4 h-4 text-blue-600" />
                <span className="text-blue-700 font-semibold">Filter</span>
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl hover:bg-gray-100 transition-all duration-300">
                <Grid className="w-4 h-4 text-gray-600" />
              </button>
            </div> */}
        {/* </div> */}
        {/* </div> */}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Members
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {members.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active</p>
                <p className="text-3xl font-bold text-gray-900">24</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          {/* <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            New This Month
          </p>
          <p className="text-3xl font-bold text-gray-900">12</p>
        </div>
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
      </div>
    </div> */}

          <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Blood Donors
                </p>
                <p className="text-3xl font-bold text-gray-900">18</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-rose-500 rounded-xl flex items-center justify-center">
                <Droplets className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Member Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="group bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-4 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Profile Image */}
              <div className="relative mb-4">
                <div className="w-20 h-20 mx-auto rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 p-1">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full rounded-xl object-cover"
                  />
                </div>
              </div>

              {/* Member Info */}
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-3 truncate">
                  {member.name}
                </h3>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="inline-flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
                    <span className="text-blue-700 font-semibold text-xs">
                      {member.id}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg">
                    <Droplets className="w-3 h-3 text-red-500" />
                    <span className="text-red-700 font-bold text-xs">
                      {member.bloodGroup}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-2 bg-gray-50/50 rounded-lg">
                  <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    {/* <p className="text-xs font-medium text-gray-500">Phone</p> */}
                    <p className="text-xs font-semibold text-gray-900 truncate">
                      {member.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 bg-gray-50/50 rounded-lg">
                  <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    {/* <p className="text-xs font-medium text-gray-500">Email</p> */}
                    <p className="text-xs font-semibold text-gray-900 truncate">
                      {member.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <button className="px-8 py-4 bg-white/70 backdrop-blur-sm border border-gray-200 text-gray-700 font-semibold rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300">
            Load More Members
          </button>
        </div>
      </div>
    </div>
    <Model>
      <AddMemberForm />
    </Model>
  </>
);

export default page;
