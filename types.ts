export type User = {
    _id: string;
    name: string;
    user_first_name: string;
    user_last_name: string;
    email: string;
    user_image: string;
    user_mobile: string;
    role: {
        id: number;
        name: string;
    }

};

export type Camera = {
    id: number;
    camera_name: string;
    rtsp_url: string;
    camera_code: string;
    company_id: number | null;
    status: number;
    status_updated_at: string | null; // ISO date-time string
    created_at: string; // ISO date-time string
    updated_at: string; // ISO date-time string
    is_entry: boolean | null;
    created_by: number | null;
    updated_by: number | null;
};

export type UserT = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    role_id: number;
    role_name: string | null;
    is_active: number; // 1 = active, 0 = inactive
    created_at: string; // ISO datetime string
    updated_at: string; // ISO datetime string
    created_by: number | null;
    updated_by: number | null;
};

export type Role = {
    id: number
    name: string
    description: string | null
    is_active: number // 1 or 0
    created_at: string
    updated_at: string
    created_by: {
        id: number
        name: string
    } | null
    updated_by: {
        id: number
        name: string
    } | null
}
