import { CustomFlatList } from '@components';
import { StyleSheet, RefreshControl, View } from 'react-native';
import React from 'react';
import { ORDER_LIST } from "../queries";
import { gql, useQuery } from '@apollo/client';


const defaultData = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
];

export const QueryOrderList = ({
    renderItem = () => <View />,
    renderItemLoading = () => <View />,
}) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const {
        loading,
        error,
        data,
        refetch,
    } = useQuery(ORDER_LIST, {
        variables: null,
    });

    let _data = data?.customerOrders?.items ? data?.customerOrders?.items : defaultData

    console.log('_data', _data);
    
    if (error) {
        return null;
    }

    const handleRefresh = () => {
        setRefreshing(true);
        refetch();
        setTimeout(() => {
            setRefreshing(false);
        }, 3000);
    };

    return (
        <CustomFlatList
            data={_data}
            renderItem={loading ? renderItemLoading : renderItem}
            horizontal={false}
            keyExtractor={(item, index) => item.id.toString()}
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
        />
    );
};

const styles = StyleSheet.create({
    contentContainerStyle: { paddingVertical: 15 },
});
