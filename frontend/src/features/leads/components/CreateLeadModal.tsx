import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { LeadStatus, LeadSource } from '../types';
import { useCreateLead } from '../hooks';

const createLeadSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  status: z.nativeEnum(LeadStatus),
  source: z.nativeEnum(LeadSource),
});

type FormData = z.infer<typeof createLeadSchema>;

interface CreateLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const selectClass =
  'w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors';

export const CreateLeadModal: React.FC<CreateLeadModalProps> = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(createLeadSchema),
    defaultValues: { status: LeadStatus.NEW, source: LeadSource.WEBSITE },
  });

  const createMutation = useCreateLead();

  const onSubmit = (data: FormData) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Lead">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Full Name" placeholder="John Doe" {...register('name')} error={errors.name?.message} />
        <Input label="Email Address" type="email" placeholder="john@example.com" {...register('email')} error={errors.email?.message} />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
          <select {...register('status')} className={selectClass}>
            {Object.values(LeadStatus).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.status && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.status.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Source</label>
          <select {...register('source')} className={selectClass}>
            {Object.values(LeadSource).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.source && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.source.message}</p>}
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100 dark:border-gray-700">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={createMutation.isPending}>Create Lead</Button>
        </div>
      </form>
    </Modal>
  );
};
