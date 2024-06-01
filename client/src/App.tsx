import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import AuthorPanel from './components/AuthorPanel'
import BookPanel from './components/BookPanel'

function App() {
  return (
    <Box>
      <Tabs>
        <TabList>
          <Tab>Authors</Tab>
          <Tab>Books</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <AuthorPanel />
          </TabPanel>
          <TabPanel>
            <BookPanel />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default App
