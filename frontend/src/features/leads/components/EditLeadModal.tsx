import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { LeadStatus, LeadSource, Lead } from '../types';
import { useUpdateLead } from '../hooks';

const editLeadSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  status: z.nativeEnum(LeadStatus),
  source: z.nativeEnum(LeadSource),
});

type FormData = z.infer<typeof editLeadSchema>;

interface EditLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
}

const selectClass =
  'w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors';

export const EditLeadModal: React.FC<EditLeadModalProps> = ({ isOpen, onClose, lead }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(editLeadSchema),
  });

  useEffect(() => {
    if (lead) {
      reset({
        name: lead.name,
        email: lead.email,
        status: lead.status,
        source: lead.source,
      });
    }
  }, [lead, reset]);

  const updateMutation = useUpdateLead();

  const onSubmit = (data: FormData) => {
    if (!lead) return;
    updateMutation.mutate({ id: lead._id, data }, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Lead">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Full Name" {...register('name')} error={errors.name?.message} />
        <Input label="Email Address" type="email" {...register('email')} error={errors.email?.message} />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
          <select {...register('status')} className={selectClass}>
            {Object.values(LeadStatus).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Source</label>
          <select {...register('source')} className={selectClass}>
            {Object.values(LeadSource).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100 dark:border-gray-700">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={updateMutation.isPending}>Save Changes</Button>
        </div>
      </form>
    </Modal>
  );
};
