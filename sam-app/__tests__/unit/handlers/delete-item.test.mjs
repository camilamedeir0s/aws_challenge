import { deleteItemHandler } from '../../../src/handlers/get-by-id.mjs'; 
import { DynamoDBDocumentClient, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { mockClient } from "aws-sdk-client-mock";
 
describe('Test deleteItemHandler', () => { 
    const ddbMock = mockClient(DynamoDBDocumentClient);
 
    beforeEach(() => {
        ddbMock.reset();
      });
 
    it('should delete item by id', async () => { 
        const item = { id: 'id1' }; 
 
        ddbMock.on(DeleteCommand).resolves({
            Item: item,
        }); 
 
        const event = { 
            httpMethod: 'DELETE', 
            pathParameters: { 
                id: 'id1' 
            } 
        };
 
        const result = await deleteItemHandler(event); 
 
        const expectedResult = { 
            statusCode: 200, 
            body: JSON.stringify(event.pathParameters.id) 
        }; 
 
        // Compare the result with the expected result 
        expect(result).toEqual(expectedResult); 
    }); 
}); 
 