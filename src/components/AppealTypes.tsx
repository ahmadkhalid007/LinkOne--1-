import { BookOpen, CheckSquare, Calendar, FileText } from 'lucide-react';
import { useState } from 'react';
import { AppealForm } from './AppealForm';

interface AppealTypesProps {
  onSelectAppeal: () => void;
}

export function AppealTypes({ onSelectAppeal }: AppealTypesProps) {
  const [selectedAppealType, setSelectedAppealType] = useState<string | null>(null);

  const appealTypes = [
    {
      id: 'cross-department',
      icon: BookOpen,
      title: 'Cross-Department Registration',
      description: 'Students can register for failed courses in other departments with automated approval workflow',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      id: 'multi-level',
      icon: CheckSquare,
      title: 'Multi-Level Approvals',
      description: 'Sequential approvals from course coordinators, directors, and department heads',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      id: 'leave-management',
      icon: FileText,
      title: 'Leave Management',
      description: 'Submit and track medical/other leave applications through proper channels',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600',
    },
    {
      id: 'timetable-clash',
      icon: Calendar,
      title: 'Timetable Clash Detection',
      description: 'Automatically detect and resolve course scheduling conflicts',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
  ];

  if (selectedAppealType) {
    const appeal = appealTypes.find(a => a.id === selectedAppealType);
    return (
      <AppealForm 
        appealType={appeal!} 
        onBack={() => setSelectedAppealType(null)} 
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-blue-600 mb-4">Proposed Solution</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          A comprehensive web-based system that automates and streamlines:
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {appealTypes.map((appeal) => {
          const Icon = appeal.icon;
          return (
            <div
              key={appeal.id}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border-l-4 border-transparent hover:border-blue-500 cursor-pointer"
              onClick={() => setSelectedAppealType(appeal.id)}
            >
              <div className={`inline-flex p-3 rounded-lg ${appeal.bgColor} mb-4`}>
                <Icon className={appeal.iconColor} size={24} />
              </div>
              <h3 className={`text-gray-900 mb-3 bg-gradient-to-r ${appeal.color} bg-clip-text text-transparent`}>
                {appeal.title}
              </h3>
              <p className="text-gray-600">
                {appeal.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-white mb-4">Ready to Submit Your Appeal?</h3>
          <p className="text-blue-50 mb-6">
            Choose any of the modules above to start your application process. 
            Our automated system will guide you through each step.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              View Guidelines
            </button>
            <button className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
              Track Existing Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
