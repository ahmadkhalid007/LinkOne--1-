import { Search, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function StatusTracking() {
  const [searchId, setSearchId] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Mock data for applications
  const applications = [
    {
      id: 'APP-2025-001',
      type: 'Cross-Department Registration',
      submittedDate: '2025-10-05',
      status: 'approved',
      currentStage: 'Department Head',
      stages: [
        { name: 'Course Coordinator', status: 'approved', date: '2025-10-06' },
        { name: 'Director', status: 'approved', date: '2025-10-08' },
        { name: 'Department Head', status: 'approved', date: '2025-10-10' },
      ],
    },
    {
      id: 'APP-2025-002',
      type: 'Leave Management',
      submittedDate: '2025-10-08',
      status: 'pending',
      currentStage: 'Director',
      stages: [
        { name: 'Course Coordinator', status: 'approved', date: '2025-10-09' },
        { name: 'Director', status: 'pending', date: null },
        { name: 'Department Head', status: 'pending', date: null },
      ],
    },
    {
      id: 'APP-2025-003',
      type: 'Timetable Clash Detection',
      submittedDate: '2025-10-07',
      status: 'rejected',
      currentStage: 'Course Coordinator',
      stages: [
        { name: 'Course Coordinator', status: 'rejected', date: '2025-10-08' },
      ],
      rejectionReason: 'Overlapping course timings cannot be resolved automatically. Please contact the academic office.',
    },
  ];

  const handleSearch = () => {
    setShowResults(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="text-green-500" size={20} />;
      case 'rejected':
        return <XCircle className="text-red-500" size={20} />;
      case 'pending':
        return <Clock className="text-yellow-500" size={20} />;
      default:
        return <AlertCircle className="text-gray-400" size={20} />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-700">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-700">Rejected</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-gray-900 mb-4">Track Your Application Status</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enter your application ID to track the status of your appeal. You can find your application ID 
            in the confirmation email sent after submission.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter Application ID (e.g., APP-2025-001)"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch}>
                <Search className="mr-2" size={20} />
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Applications or Search Results */}
        <div>
          <h3 className="text-gray-900 mb-6">
            {showResults && searchId ? 'Search Results' : 'Recent Applications'}
          </h3>
          
          <div className="space-y-6">
            {applications.map((app) => (
              <div key={app.id} className="bg-white rounded-xl shadow-sm p-6">
                {/* Application Header */}
                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-gray-900">{app.id}</h4>
                      {getStatusBadge(app.status)}
                    </div>
                    <p className="text-gray-600">{app.type}</p>
                    <p className="text-gray-500">Submitted: {new Date(app.submittedDate).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Approval Timeline */}
                <div className="space-y-4">
                  <p className="text-gray-700">Approval Progress:</p>
                  <div className="relative">
                    {app.stages.map((stage, index) => (
                      <div key={index} className="flex items-start gap-4 pb-8 last:pb-0">
                        {/* Timeline Line */}
                        {index < app.stages.length - 1 && (
                          <div className="absolute left-[9px] top-[28px] bottom-0 w-0.5 bg-gray-200" style={{ height: 'calc(100% - 28px)' }} />
                        )}
                        
                        {/* Status Icon */}
                        <div className="relative z-10 bg-white">
                          {getStatusIcon(stage.status)}
                        </div>

                        {/* Stage Info */}
                        <div className="flex-1 pt-0.5">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-gray-900">{stage.name}</p>
                              {stage.date && (
                                <p className="text-gray-500">
                                  {stage.status === 'approved' ? 'Approved' : 'Reviewed'} on {new Date(stage.date).toLocaleDateString()}
                                </p>
                              )}
                              {!stage.date && stage.status === 'pending' && (
                                <p className="text-gray-500">Awaiting review...</p>
                              )}
                            </div>
                            {getStatusBadge(stage.status)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rejection Reason if applicable */}
                {app.status === 'rejected' && app.rejectionReason && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <XCircle className="text-red-500 mt-0.5" size={20} />
                      <div>
                        <p className="text-red-700">Rejection Reason:</p>
                        <p className="text-red-600">{app.rejectionReason}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Approval Message if applicable */}
                {app.status === 'approved' && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="text-green-500 mt-0.5" size={20} />
                      <div>
                        <p className="text-green-700">Your application has been approved!</p>
                        <p className="text-green-600">You will receive further instructions via email.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-blue-50 rounded-xl p-8">
          <h3 className="text-gray-900 mb-4">Need Help?</h3>
          <p className="text-gray-600 mb-6">
            If you cannot find your application or have questions about the approval process, 
            please contact our support team.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline">
              Contact Support
            </Button>
            <Button variant="outline">
              View FAQ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
