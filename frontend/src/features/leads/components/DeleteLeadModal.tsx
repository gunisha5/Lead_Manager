import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Lead } from '../types';
import { useDeleteLead } from '../hooks';

interface DeleteLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
}

export const DeleteLeadModal: React.FC<DeleteLeadModalProps> = ({ isOpen, onClose, lead }) => {
  const deleteMutation = useDeleteLead();

  const handleDelete = () => {
    if (!lead) return;
    deleteMutation.mutate(lead._id, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Lead">
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Are you sure you want to delete{' '}
              <span className="font-semibold text-gray-900 dark:text-white">{lead?.name}</span>?
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100 dark:border-gray-700">
          <Button variant="outline" onClick={onClose} disabled={deleteMutation.isPending}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            isLoading={deleteMutation.isPending}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
