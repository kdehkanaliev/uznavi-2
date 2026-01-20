
import React, { useState, useEffect } from 'react';
import { BudgetTier, TripType, Pace } from '../types';
import { INTERESTS } from '../constants';

interface UziChatProps {
  onComplete: (data: any) => void;
}

const UziChat: React.FC<UziChatProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    interests: [] as string[],
    budgetTier: BudgetTier.SILVER,
    tripType: TripType.COUPLE,
    days: 3,
    pace: Pace.MODERATE
  });

  const steps = [
    {
      question: "Salom! I'm Uzi. What are your interests?",
      options: INTERESTS,
      multiple: true,
      key: 'interests'
    },
    {
      question: "What's your budget tier?",
      options: Object.values(BudgetTier),
      multiple: false,
      key: 'budgetTier'
    },
    {
      question: "Who are you traveling with?",
      options: Object.values(TripType),
      multiple: false,
      key: 'tripType'
    },
    {
      question: "How many days will you stay?",
      input: "number",
      key: 'days'
    },
    {
      question: "What's your preferred pace?",
      options: Object.values(Pace),
      multiple: false,
      key: 'pace'
    }
  ];

  const handleSelect = (val: any) => {
    const currentStep = steps[step];
    if (currentStep.multiple) {
      const current = [...(formData as any)[currentStep.key]];
      if (current.includes(val)) {
        setFormData({ ...formData, [currentStep.key]: current.filter(i => i !== val) });
      } else {
        setFormData({ ...formData, [currentStep.key]: [...current, val] });
      }
    } else {
      setFormData({ ...formData, [currentStep.key]: val });
      if (step < steps.length - 1) setStep(step + 1);
      else onComplete({ ...formData, [currentStep.key]: val });
    }
  };

  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else onComplete(formData);
  };

  const current = steps[step];

  return (
    <div className="flex flex-col h-full p-6 bg-white">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center text-white shadow-lg">
          <i className="fas fa-robot text-xl"></i>
        </div>
        <div>
          <h2 className="font-bold text-lg text-slate-800">Uzi</h2>
          <p className="text-xs text-slate-500">Your AI Guide</p>
        </div>
      </div>

      <div className="bg-sky-50 p-4 rounded-2xl rounded-tl-none mb-6 shadow-sm border border-sky-100">
        <p className="text-slate-700 leading-relaxed font-medium">{current.question}</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pb-4">
        {current.options?.map((opt) => (
          <button
            key={opt}
            onClick={() => handleSelect(opt)}
            className={`w-full text-left p-4 rounded-xl border transition-all duration-200 active:scale-95 ${
              (formData as any)[current.key]?.includes?.(opt) || (formData as any)[current.key] === opt
                ? 'bg-sky-500 text-white border-sky-600 shadow-md ring-2 ring-sky-200'
                : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300'
            }`}
          >
            {opt}
          </button>
        ))}
        {current.input === 'number' && (
          <div className="space-y-4">
            <input
              type="number"
              value={formData.days}
              onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) })}
              className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              min="1"
              max="30"
            />
            <button
              onClick={nextStep}
              className="w-full py-4 bg-sky-500 text-white rounded-xl font-bold shadow-lg hover:bg-sky-600 transition-colors"
            >
              Confirm
            </button>
          </div>
        )}
      </div>

      {current.multiple && (formData as any)[current.key].length > 0 && (
        <button
          onClick={nextStep}
          className="mt-4 w-full py-4 bg-sky-500 text-white rounded-xl font-bold shadow-lg hover:bg-sky-600"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default UziChat;
