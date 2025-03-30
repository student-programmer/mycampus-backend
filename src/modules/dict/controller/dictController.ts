import {
    Controller,
    Get,
    HttpStatus,
    Request,
} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';

import {LoggerService} from '../../common';
import {CountryData, InterestData, LanguageData, StudyDirectionData, UniversityData} from '../model';
import {DictService} from '../service';

@Controller('dict')
@ApiTags('Dictionary')
export class DictController {
    public constructor(
        private readonly logger: LoggerService,
        private readonly DictService: DictService, // исправлено название переменной
    ) {
    }

    @Get('universities')
    @ApiOperation({summary: 'Get all universities'})
    @ApiResponse({status: HttpStatus.OK, type: [UniversityData]})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getAllUniversities(@Request() req: Request): Promise<UniversityData[]> {

        const universities: UniversityData[] = await this.DictService.getAllUniversities();

        this.logger.info(`Got ${universities.length} universities`);

        return universities;
    }

    @Get('languages')
    @ApiOperation({summary: 'Get all languages'})
    @ApiResponse({status: HttpStatus.OK, type: [LanguageData]})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getAllLanguages(@Request() req: Request): Promise<LanguageData[]> {

        const languages: LanguageData[] = await this.DictService.getAllLanguages();

        this.logger.info(`Got ${languages.length} languages`);

        return languages;
    }

    @Get('interests')
    @ApiOperation({summary: 'Get all interests'})
    @ApiResponse({status: HttpStatus.OK, type: [InterestData]})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getAllInterests(@Request() req: Request): Promise<InterestData[]> {

        const interests: InterestData[] = await this.DictService.getAllInterests();

        this.logger.info(`Got ${interests.length} interests`);

        return interests;
    }

    @Get('study_directions')
    @ApiOperation({summary: 'Get all study directions'})
    @ApiResponse({status: HttpStatus.OK, type: [StudyDirectionData]})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getAllStudyDirection(@Request() req: Request): Promise<StudyDirectionData[]> {

        const studyInterests: StudyDirectionData[] = await this.DictService.getAllStudyDirections();

        this.logger.info(`Got ${studyInterests.length} study interests`);

        return studyInterests;
    }

    @Get('countries')
    @ApiOperation({summary: 'Get all countries'})
    @ApiResponse({status: HttpStatus.OK, type: [CountryData]})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getAllCountries(@Request() req: Request): Promise<CountryData[]> {

        const countries: CountryData[] = await this.DictService.getAllCountries();

        this.logger.info(`Got ${countries.length} countries`);

        return countries;
    }

}
