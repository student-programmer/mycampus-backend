import {Injectable} from '@nestjs/common';
import {PrismaService} from '../../common';
import {CountryData, InterestData, LanguageData, StudyDirectionData, UniversityData} from '../model';

@Injectable()
export class DictService {
    public constructor(
        private readonly prismaService: PrismaService,
    ) {
    }

    /**
     * Get all universities from the database
     *
     * @returns A list of universities (id and name)
     */
    public async getAllUniversities(): Promise<UniversityData[]> {
        const uniList = await this.prismaService.university.findMany({
            select: {
                id: true,
                name: true,
            },
        });

        return uniList.map(uni => new UniversityData(uni));
    }

    public async getAllLanguages(): Promise<LanguageData[]> {
        const langList = await this.prismaService.language.findMany({
            select: {
                id: true,
                name: true,
            },
        });

        return langList.map(lang => new LanguageData(lang));
    }

    public async getAllInterests(): Promise<InterestData[]> {
        const interestList = await this.prismaService.interest.findMany({
            select: {
                id: true,
                name: true,
            },
        });

        return interestList.map(interest => new InterestData(interest));
    }

    public async getAllStudyDirections(): Promise<StudyDirectionData[]> {
        const studyDirectionList = await this.prismaService.studyDirection.findMany({
            select: {
                id: true,
                name: true,
            },
        });

        return studyDirectionList.map(studyDirection => new StudyDirectionData(studyDirection));
    }

    public async getAllCountries(): Promise<CountryData[]> {
        const countryList = await this.prismaService.country.findMany({
            select: {
                id: true,
                name: true,
                photo: true,
            },
        });

        return countryList.map(country => new CountryData(country));
    }
}
