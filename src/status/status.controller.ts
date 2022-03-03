import { Controller, Get } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Container Health Check')
@Controller('status')
export class StatusController {
  @Get()
  @ApiOperation({
    summary:
      'Execute StatusController.getStatus()',
    description:
      'Get the status of the container.',
  })
  @ApiResponse({
    status: 200,
    description:
      'You have successfully completed a health check on the container.',
  })
  getStatus() {
    return 'Container health check was successful!';
  }
}
