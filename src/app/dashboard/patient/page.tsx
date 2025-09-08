'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../components/Auth/AuthProvider';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Progress } from '../../../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import Header from '../../../components/Layout/Header';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for development
  const upcomingAppointments = [
    {
      id: '1',
      doctorName: 'Dr. Sarah Johnson',
      specialization: 'Cardiology',
      date: '2024-02-15',
      time: '10:30 AM',
      type: 'Video Call',
      status: 'confirmed',
      avatar: 'https://placehold.co/100x100?text=Dr.+Sarah+Johnson+Professional+Portrait',
    },
    {
      id: '2',
      doctorName: 'Dr. Michael Chen',
      specialization: 'Dermatology',
      date: '2024-02-18',
      time: '2:15 PM',
      type: 'Video Call',
      status: 'pending',
      avatar: 'https://placehold.co/100x100?text=Dr.+Michael+Chen+Professional+Portrait',
    },
  ];

  const recentConsultations = [
    {
      id: '1',
      doctorName: 'Dr. Emily Rodriguez',
      specialization: 'General Medicine',
      date: '2024-01-28',
      diagnosis: 'Common Cold',
      prescription: 'Rest, fluids, and over-the-counter pain relief',
      rating: 5,
      avatar: 'https://placehold.co/100x100?text=Dr.+Emily+Rodriguez+Professional+Portrait',
    },
    {
      id: '2',
      doctorName: 'Dr. James Wilson',
      specialization: 'Pediatrics',
      date: '2024-01-15',
      diagnosis: 'Annual Checkup',
      prescription: 'Continue current vitamins, schedule next checkup',
      rating: 4,
      avatar: 'https://placehold.co/100x100?text=Dr.+James+Wilson+Professional+Portrait',
    },
  ];

  const medicalRecords = [
    {
      id: '1',
      date: '2024-01-28',
      type: 'Consultation',
      doctor: 'Dr. Emily Rodriguez',
      condition: 'Upper Respiratory Infection',
      status: 'Completed',
    },
    {
      id: '2',
      date: '2024-01-15',
      type: 'Checkup',
      doctor: 'Dr. James Wilson',
      condition: 'Annual Physical Examination',
      status: 'Completed',
    },
    {
      id: '3',
      date: '2023-12-10',
      type: 'Lab Results',
      doctor: 'Dr. Sarah Johnson',
      condition: 'Blood Work - Normal',
      status: 'Reviewed',
    },
  ];

  const healthStats = {
    totalConsultations: 24,
    completedTreatments: 20,
    activeConditions: 1,
    prescriptions: 8,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
    ));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">Please log in to access your dashboard.</p>
          <Link href="/auth/login">
            <Button>Go to Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name.split(' ')[0]}!</h1>
              <p className="text-gray-600">Manage your health and appointments</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4">
            <Link href="/doctors">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Find a Doctor
              </Button>
            </Link>
            <Link href="/appointments/book">
              <Button variant="outline">
                Book Appointment
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline">
                Update Profile
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-blue-600">{healthStats.totalConsultations}</CardTitle>
              <CardDescription>Total Consultations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="text-2xl">🏥</div>
                <span className="text-sm text-gray-600">All time</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-green-600">{healthStats.completedTreatments}</CardTitle>
              <CardDescription>Completed Treatments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="text-2xl">✅</div>
                <Progress value={(healthStats.completedTreatments / healthStats.totalConsultations) * 100} className="flex-1" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-orange-600">{healthStats.activeConditions}</CardTitle>
              <CardDescription>Active Conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="text-2xl">⚕️</div>
                <span className="text-sm text-gray-600">Under treatment</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-purple-600">{healthStats.prescriptions}</CardTitle>
              <CardDescription>Active Prescriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="text-2xl">💊</div>
                <span className="text-sm text-gray-600">Current medications</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="consultations">History</TabsTrigger>
            <TabsTrigger value="records">Records</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Upcoming Appointments
                    <Link href="/appointments">
                      <Button variant="outline" size="sm">View All</Button>
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {upcomingAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingAppointments.map((appointment) => (
                        <div key={appointment.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={appointment.avatar} alt={appointment.doctorName} />
                            <AvatarFallback>
                              {appointment.doctorName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-medium">{appointment.doctorName}</h4>
                            <p className="text-sm text-gray-600">{appointment.specialization}</p>
                            <p className="text-sm text-gray-600">{appointment.date} at {appointment.time}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                            <p className="text-sm text-gray-600 mt-1">{appointment.type}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center py-6">No upcoming appointments</p>
                  )}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Consultation completed with Dr. Emily Rodriguez</p>
                        <p className="text-xs text-gray-600">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Prescription updated</p>
                        <p className="text-xs text-gray-600">1 week ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Lab results uploaded</p>
                        <p className="text-xs text-gray-600">2 weeks ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>All Appointments</CardTitle>
                <CardDescription>Manage your upcoming and past appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={appointment.avatar} alt={appointment.doctorName} />
                          <AvatarFallback>
                            {appointment.doctorName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{appointment.doctorName}</h4>
                          <p className="text-sm text-gray-600">{appointment.specialization}</p>
                          <p className="text-sm text-gray-600">{appointment.date} at {appointment.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          {appointment.status === 'confirmed' ? 'Join' : 'Reschedule'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Consultation History Tab */}
          <TabsContent value="consultations">
            <Card>
              <CardHeader>
                <CardTitle>Consultation History</CardTitle>
                <CardDescription>Your past consultations and treatments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentConsultations.map((consultation) => (
                    <div key={consultation.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={consultation.avatar} alt={consultation.doctorName} />
                            <AvatarFallback>
                              {consultation.doctorName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-medium">{consultation.doctorName}</h4>
                            <p className="text-sm text-gray-600">{consultation.specialization}</p>
                            <p className="text-sm text-gray-600">{consultation.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {renderStars(consultation.rating)}
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-sm">Diagnosis</h5>
                            <p className="text-sm text-gray-600">{consultation.diagnosis}</p>
                          </div>
                          <div>
                            <h5 className="font-medium text-sm">Treatment</h5>
                            <p className="text-sm text-gray-600">{consultation.prescription}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Medical Records Tab */}
          <TabsContent value="records">
            <Card>
              <CardHeader>
                <CardTitle>Medical Records</CardTitle>
                <CardDescription>Your complete medical history and documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medicalRecords.map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <div className="text-xl">📋</div>
                        </div>
                        <div>
                          <h4 className="font-medium">{record.type}</h4>
                          <p className="text-sm text-gray-600">{record.condition}</p>
                          <p className="text-sm text-gray-600">Dr. {record.doctor} • {record.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline">{record.status}</Badge>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default PatientDashboard;