import supabase from "@/lib/supabaseClient";

export function useWktSplitConfigInfo() {

    const wktData = async (user_id, split_config_map_id = null) => {

        let query = supabase
            .from('user_split_wkt_map')
            .select(`
                id,
                split_id,
                is_active,
                created_at,
                wkt_info:user_wkt_info (
                    no_of_sets,
                    no_of_reps,
                    no_of_exercises
                ),
                split:wkt_splits (
                    id,
                    name,
                    code,
                    split_info (*)
                )
            `)
            .eq('user_id', user_id);


        if (split_config_map_id) {
            const { data, error } = await query
                .eq('id', split_config_map_id)
                .maybeSingle();

            if (error) {
                return { success: false, message: error.message, data: null };
            }

            return {
                success: true,
                message: 'Workout split fetched successfully',
                data
            };
        }

        const { data, error } = await query.order('id', { ascending: true });
        console.log(data);


        if (error) {
            return { success: false, message: error.message, data: [] };
        }

        return {
            success: true,
            message: 'Workout split list fetched successfully',
            data
        };
    };

    return { wktData };
}