/**
 * PermissionContext — JobCentral
 * Role-Based Access Control (RBAC)
 * Defines permissions per role and provides helper hooks
 */
import React, { createContext, useContext, useMemo } from 'react';
import { useAuth } from './AuthContext';

// ─── Permission Matrix ────────────────────────────────────────────────────────
const PERMISSIONS = {
  admin: {
    // User management
    'users:read': true,
    'users:create': true,
    'users:update': true,
    'users:delete': true,
    'users:ban': true,

    // Jobs
    'jobs:read': true,
    'jobs:create': true,
    'jobs:update': true,
    'jobs:delete': true,
    'jobs:moderate': true,
    'jobs:approve': true,

    // Companies
    'companies:read': true,
    'companies:update': true,
    'companies:delete': true,
    'companies:verify': true,

    // Applications
    'applications:read': true,
    'applications:update': true,

    // Reports
    'reports:read': true,
    'reports:export': true,

    // System
    'system:config': true,
    'system:logs': true,
    'system:monitoring': true,

    // Payments
    'payments:read': true,
    'payments:refund': true,

    // Content
    'content:manage': true,
    'categories:manage': true,
    'templates:manage': true,
    'blacklist:manage': true,

    // Support
    'support:read': true,
    'support:respond': true,
    'support:close': true,

    // Notifications
    'notifications:send': true,
    'notifications:broadcast': true,
  },

  staff: {
    // Limited user management
    'users:read': true,
    'users:update': false,
    'users:delete': false,

    // Jobs — can moderate
    'jobs:read': true,
    'jobs:moderate': true,
    'jobs:approve': true,
    'jobs:delete': false,

    // Companies
    'companies:read': true,
    'companies:verify': true,

    // Applications
    'applications:read': true,

    // Reports — read only
    'reports:read': true,
    'reports:export': false,

    // Support
    'support:read': true,
    'support:respond': true,
    'support:close': false,

    // Notifications
    'notifications:send': true,
    'notifications:broadcast': false,

    // Content — limited
    'content:manage': false,
    'categories:manage': true,
  },

  employer: {
    // Own company
    'companies:read': true,
    'companies:update': true, // Own company only (enforced server-side)

    // Own jobs
    'jobs:read': true,
    'jobs:create': true,
    'jobs:update': true, // Own jobs only
    'jobs:delete': true, // Own jobs only

    // Applications to own jobs
    'applications:read': true,
    'applications:update': true, // Status update

    // Payments
    'payments:read': true, // Own payments

    // Profile
    'profile:update': true,
  },

  candidate: {
    // Jobs — browse only
    'jobs:read': true,

    // Applications — own only
    'applications:read': true,
    'applications:create': true,
    'applications:delete': true, // Withdraw

    // Profile
    'profile:update': true,

    // CV
    'cv:read': true,
    'cv:create': true,
    'cv:update': true,
    'cv:delete': true,
  },
};

// ─── Context ──────────────────────────────────────────────────────────────────
const PermissionContext = createContext(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export const PermissionProvider = ({ children }) => {
  const { user } = useAuth();

  const permissions = useMemo(() => {
    if (!user?.role) return {};
    return PERMISSIONS[user.role] || {};
  }, [user?.role]);

  /**
   * Check if current user has a specific permission
   * @param {string} permission - e.g. 'jobs:create', 'users:delete'
   */
  const hasPermission = (permission) => {
    if (!user) return false;
    if (user.role === 'admin') return true; // Admin has all permissions
    return permissions[permission] === true;
  };

  /**
   * Check if current user has a specific role
   * @param {string|string[]} roles
   */
  const hasRole = (roles) => {
    if (!user) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(user.role);
  };

  /**
   * Check if current user has ANY of the given permissions
   */
  const hasAnyPermission = (permissionList) => {
    return permissionList.some((p) => hasPermission(p));
  };

  /**
   * Check if current user has ALL of the given permissions
   */
  const hasAllPermissions = (permissionList) => {
    return permissionList.every((p) => hasPermission(p));
  };

  const value = {
    permissions,
    hasPermission,
    hasRole,
    hasAnyPermission,
    hasAllPermissions,
    currentRole: user?.role || null,
  };

  return <PermissionContext.Provider value={value}>{children}</PermissionContext.Provider>;
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const usePermission = () => {
  const context = useContext(PermissionContext);
  if (!context) {
    return {
      permissions: {},
      hasPermission: () => true,
      hasRole: () => true,
      hasAnyPermission: () => true,
      hasAllPermissions: () => true,
      currentRole: 'admin',
    };
  }
  return context;
};

export default PermissionContext;
