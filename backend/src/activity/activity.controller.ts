import { Controller, Get, Body, Patch, Param, Delete} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  async findAll() {
    return this.activityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.activityService.findById(id);
  }

  @Patch(':id')
  asyncupdate(@Param('id') id: string, @Body() updateActivityDto: UpdateActivityDto) {
    return this.activityService.update(id, updateActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activityService.remove(id);
  }
}
