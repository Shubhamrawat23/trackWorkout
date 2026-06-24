import supabase from "@/lib/supabaseClient";

export function useWktSplitConfigInfo() {

    const wktData = async (user_id, split_config_map_id) => {

        const { data, error } = await supabase
            .from('user_split_wkt_map')
            .select(`
                id,
                split_id,
                wkt_config_id,
                is_active
            `)
            .eq('user_id', user_id)
            .eq('id', split_config_map_id)
            .single();

        if (error) {
            return {
                success: false,
                message: error.message,
                data: null
            };
        }

        const splitData = await fetchSplitData(data.split_id);

        if (!splitData.success) {
            return splitData;
        }

        return {
            success: true,
            message: 'Workout split fetched successfully',
            data: {
                id: data.id,
                wkt_config_id: data.wkt_config_id,
                is_active: data.is_active,
                split: splitData.data
            }
        };
    };

    async function fetchSplitData(split_id) {

        const { data, error } = await supabase
            .from('wkt_splits')
            .select(`
                id,
                name,
                code,
                split_info (
                    *
                )
            `)
            .eq('id', split_id)
            .single();

        if (error) {
            return {
                success: false,
                message: error.message,
                data: null
            };
        }

        return {
            success: true,
            message: 'Split fetched successfully',
            data
        };
    }

    return {
        wktData,
    };
}