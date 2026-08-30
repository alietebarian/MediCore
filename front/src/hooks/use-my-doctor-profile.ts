'use client'

import { apiClient } from "@/lib/api-client"
import { useQuery } from "@tanstack/react-query"

type myDoctorProfile = {
    id: string
    licenseNumber: string
    specialtyName: string
}

export function useMyDoctorProfle(){
    return useQuery({
        queryFn: async () => {
            const {data} = await apiClient.get<myDoctorProfile>('/doctors/me')
            return data
        },
        queryKey: ['my-doctor-profile']
    })
}