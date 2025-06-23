
import { get } from './api';
import { DashboardStats, Listing, Booking } from '../types/host';

export const fetchHostStats = async (): Promise<DashboardStats> => {
  try {
    const response = await get<DashboardStats>('/host/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching host stats:', error);
    throw error;
  }
};

export const fetchHostListings = async (page: number = 1, limit: number = 10, status?: string): Promise<{ listings: Listing[]; pagination: any }> => {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (status) params.append('status', status);
    
    const response = await get<{ listings: Listing[]; pagination: any }>(`/host/listings?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching host listings:', error);
    throw error;
  }
};

export const fetchRecentBookings = async (limit: number = 5): Promise<Booking[]> => {
  try {
    const response = await get<{ bookings: Booking[] }>(`/host/bookings?limit=${limit}`);
    return response.data.bookings;
  } catch (error) {
    console.error('Error fetching recent bookings:', error);
    throw error;
  }
};

export const fetchCalendarData = async (listingId?: string, month?: number, year?: number): Promise<any> => {
  try {
    const params = new URLSearchParams();
    if (listingId) params.append('listingId', listingId);
    if (month) params.append('month', month.toString());
    if (year) params.append('year', year.toString());
    
    const response = await get<any>(`/host/calendar?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching calendar data:', error);
    throw error;
  }
};

export const fetchAnalytics = async (period: string = '30d'): Promise<any> => {
  try {
    const response = await get<any>(`/host/analytics?period=${period}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
};

