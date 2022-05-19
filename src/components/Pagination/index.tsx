import { Box, Button, Stack } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

export function Pagination(){
    return (
        <Stack
        direction={["column", "row"]}
        mt="8"
        justify="space-between"
        align="center"
        spacing="6"
        >
            <Box>
                <strong>0</strong> - <strong>3</strong> de <strong>3</strong>
            </Box>
            <Stack direction={"row"} spacing="2" >

                <PaginationItem isCurrent={true} number={1}/>
                <PaginationItem number={2}/>
                <PaginationItem number={3}/>
                

                
            </Stack>
            
        </Stack>
    );
}