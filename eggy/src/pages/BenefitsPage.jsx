import { Box, Typography, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import PageContainer from '../components/common/PageContainer';
import { EGG_BENEFITS } from '../utils/constants';

/**
 * Benefits Page
 * Educational content about egg health benefits
 * Clean, modern infographic-style presentation
 */
const BenefitsPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <PageContainer>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: 700, mb: 0.5 }}
        >
          Why Eat Eggs?
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          sx={{ mb: 3, maxWidth: 280, mx: 'auto' }}
        >
          Discover the health benefits of eggs
        </Typography>
      </motion.div>

      {/* Hero Egg */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 180 }}
        style={{ textAlign: 'center', marginBottom: 28 }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255, 149, 0, 0.1) 0%, rgba(255, 149, 0, 0.05) 100%)',
            fontSize: '2.5rem',
            boxShadow: '0 4px 20px rgba(255, 149, 0, 0.15)',
          }}
        >
          🥚
        </Box>
      </motion.div>

      {/* Benefits Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: 2,
          }}
        >
          {EGG_BENEFITS.map((benefit) => (
            <motion.div
              key={benefit.id}
              variants={cardVariants}
              whileHover={{ scale: 1.01, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                sx={{
                  height: '100%',
                  background: '#FFFFFF',
                  overflow: 'visible',
                  position: 'relative',
                }}
              >
                <CardContent sx={{ p: 2.5, pt: 4 }}>
                  {/* Icon */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -14,
                      left: 16,
                      width: 40,
                      height: 40,
                      borderRadius: 2.5,
                      background: `linear-gradient(135deg, ${benefit.color}ee, ${benefit.color})`,
                      boxShadow: `0 4px 12px ${benefit.color}35`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                    }}
                  >
                    {benefit.icon}
                  </Box>

                  {/* Content */}
                  <Typography variant="body1" sx={{ fontWeight: 700, mb: 0.75 }}>
                    {benefit.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.55, mb: 1.5, fontSize: '0.8125rem' }}
                  >
                    {benefit.description}
                  </Typography>

                  {/* Stats badge */}
                  <Box
                    sx={{
                      display: 'inline-block',
                      px: 1.25,
                      py: 0.375,
                      borderRadius: 1.5,
                      bgcolor: `${benefit.color}12`,
                      color: benefit.color,
                      fontWeight: 600,
                      fontSize: '0.7rem',
                    }}
                  >
                    {benefit.stats}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </motion.div>

      {/* Footer tip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <Box
          sx={{
            mt: 3,
            p: 2.5,
            borderRadius: 3,
            background: 'rgba(255, 149, 0, 0.05)',
            border: '1px solid rgba(255, 149, 0, 0.12)',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8125rem' }}>
            Pro Tip
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.25, fontSize: '0.8125rem' }}
          >
            Pair eggs with vegetables for maximum nutrition.
          </Typography>
        </Box>
      </motion.div>
    </PageContainer>
  );
};

export default BenefitsPage;
